---
textprov: true
title: Reverse proxy and TLS
description: How to terminate TLS in front of Onetime Secret without misattributing every client IP to the proxy or silently dropping the session cookie.
audience: operator
pageType: how-to
sidebar:
  label: Reverse proxy and TLS
sourceOfTruth: onetimesecret/etc/examples/puma.example.rb:38 (the app binds plain HTTP only and never terminates TLS); onetimesecret/lib/onetime/middleware/static_files.rb:146-148 and onetimesecret/docker/variants/caddy.dockerfile:111-118 (the app serves its own built assets, so the proxy proxies everything); onetimesecret/lib/onetime/application/middleware_stack.rb:245,357-359 (TRUSTED_PROXY_ENABLED gates every other trusted-proxy setting); onetimesecret/etc/defaults/config.defaults.yaml:499,534,556,561,568 (the trusted-proxy settings and their shipped defaults); onetimesecret/.env.reference:1147-1159 (the edge must overwrite X-Forwarded-For under filter mode, and the depth-1 exception); onetimesecret/etc/examples/Caddyfile-example:63-64,240-269 (the shipped Caddy server-level trust declaration and the client-IP overwrite); onetimesecret/etc/defaults/config.defaults.yaml:5-6,377-384 (SSL governs link generation, and the session secure key is omitted from the shipped config unless SSL is true so that the boot fallback supplies it); onetimesecret/lib/onetime/boot.rb:87-102,353-367,402-404 and onetimesecret/lib/onetime/application/middleware_stack.rb:429-436 (the session secure flag falls back to site.ssl OR RACK_ENV=production, and that resolved value is what the session middleware receives); onetimesecret/Dockerfile:415 with onetimesecret/docker/compose/docker-compose.simple.yml:30 and onetimesecret/docker/compose/docker-compose.full.yml:67 (the image and both stacks run RACK_ENV=production); onetimesecret/lib/onetime/session.rb:246-249,261-272 (a Secure cookie over a request the app sees as non-SSL is dropped, and the app says so in the log); onetimesecret/etc/defaults/config.defaults.yaml:433-434,447-450 with onetimesecret/lib/onetime/middleware/security.rb:221-223,244-248 (the app sets X-Frame-Options and Strict-Transport-Security itself, both on by default)
---

## The app never terminates TLS

Puma binds plain HTTP on `0.0.0.0:$PORT` and the container image exposes that one
port. There is no TLS bind, no certificate path and no ACME client anywhere in the
application. HTTPS is entirely the reverse proxy's job, and every example on this
page assumes the proxy holds the certificate and speaks plain HTTP to the app.

Proxy everything. Do not carve out a `location` or `handle` block to serve
`/dist/` from disk: the app serves its own built assets through Rack, and the
project's own Caddy image ships with an empty public directory for exactly that
reason.

The app also sets its own response security headers — `Strict-Transport-Security`
and `X-Frame-Options` are both on unless you turn them off — so the proxy
configurations below deliberately add neither.

If you run the full Docker Compose stack described in
[Install with Docker](/en/install/docker), a Caddy service is already in front of
the app and already holds the certificate — it takes its hostname from `DOMAIN`,
its ACME contact address from `CERTIFICATE_EMAIL`, and persists issued
certificates in the `onetime_caddy_data` volume. The configurations below are for
a proxy you run yourself.

## Turn proxy trust on before you configure it

`TRUSTED_PROXY_ENABLED` is off unless you set it to `true`, and while it is off
the app ignores forwarded headers completely: the client IP is the address that
opened the connection. Behind a proxy that address is the proxy, so every request
in the system is attributed to one host — one address for rate limiting, one for
IP bans, one in session records and audit trails.

`TRUSTED_PROXY_MODE`, `TRUSTED_PROXY_CIDRS`, `TRUSTED_PROXY_HEADER` and
`TRUSTED_PROXY_DEPTH` do nothing at all until that switch is on. Setting the mode
and stopping there configures nothing.

Enable it only when the app is genuinely behind a proxy you control and direct
access to the app's port is blocked by a firewall. Private and loopback client
addresses are masked before they reach sessions, rate-limit keys and logs whether
or not you declare a proxy, so a direct-connect deployment does not leak raw
RFC1918 addresses either way.

## What your proxy must write into X-Forwarded-For

This is the part that is easy to get wrong and produces no error when you do.
There are exactly two modes, `filter` and `depth`, and three cases:

| Mode | What the edge must write | Why |
|---|---|---|
| `filter` (the default) | **Overwrite** `X-Forwarded-For` with the peer address | Selection is anchored at the left, so anything a client sends is read first |
| `depth` with `TRUSTED_PROXY_DEPTH=1` | **Overwrite** | The overwrite leaves exactly one attested entry, which depth 1 selects |
| `depth` with a depth of 2 or more | **Append** | The count needs each hop to contribute one entry; an overwrite collapses the chain |

### Filter mode

Filter mode walks the forwarded chain left to right and returns the first entry
that is not a trusted proxy, so the leftmost non-proxy entry wins. The trusted set
is the RFC1918, loopback and link-local ranges, plus every range you list in
`TRUSTED_PROXY_CIDRS`.

Because the leftmost entry wins, the edge proxy must overwrite `X-Forwarded-For`
with the real peer address. If it appends instead, a header the client supplied is
returned as the client IP, and IP rate limits, bans and audit attribution all
become spoofable. In nginx that is `proxy_set_header X-Forwarded-For $remote_addr;`
and in Caddy it is `header_up X-Forwarded-For {client_ip}`.

### Depth mode

Depth mode counts positions from the right of the chain and skips that many hops,
so extra leftmost entries — forged, or from farther upstream — never shift the
selection. Use it when the edge appends and you cannot change that, or when the
proxy in front of you has a public address that filter mode would read as the
client. `TRUSTED_PROXY_DEPTH` is 1 unless you set it, and is clamped to the range
1 to 10.

At depth 1 the overwrite is not merely tolerated, it is the safest single-proxy
configuration: the overwrite leaves exactly one attested entry and depth 1 selects
it. This is what the project's own Caddy example relies on.

From depth 2 upward, stop overwriting. Each counted hop has to append exactly one
entry for the count to mean anything. Overwrite a chain the count depends on and
it becomes shorter than the depth, resolution falls back to the connecting peer,
and attribution silently lands on the proxy again. A depth larger than your real
hop count is the mirror image of the same mistake: it selects an entry the client
supplied.

Depth mode is mutually exclusive with `TRUSTED_PROXY_CIDRS`. Do not set both.

### Which header, and which headers are never read

`TRUSTED_PROXY_HEADER` applies to depth mode only, and its accepted set is closed:
`X-Forwarded-For`, `Forwarded` (RFC 7239), or `Both`, which reads `Forwarded`
first and falls back. Any other value fails the boot rather than resolving
silently from the wrong header. Filter mode ignores the setting entirely and reads
the `X-Forwarded-For` family — `X-Forwarded-For`, `X-Real-IP`, `X-Client-IP`.
Because all three are in that family, have the proxy set or strip each of them
rather than pass any through unchanged; the examples below do.

Vendor client-IP headers are never read for client-IP resolution and cannot be
selected here. `CF-Connecting-IP`, `True-Client-IP` and their relatives carry a
single address rather than a chain, so there are no hops to count. If your edge
sets only one of those, configure it to write the chain into `X-Forwarded-For`.

Country-level geo headers such as `CF-IPCountry` are honoured only in filter mode
with proxy trust on and the CDN's ranges declared in `TRUSTED_PROXY_CIDRS`. Depth
mode never trusts them and resolves country to unknown unless a local MaxMind
database is configured; the app warns once at boot when you set that combination.

### Listing a CIDR range is a full trust grant

`TRUSTED_PROXY_CIDRS` does more than extend client-IP trust. Requests arriving
from a listed range also have their forwarded *host* headers honoured for
custom-domain detection, so a pass-through proxy inside a listed range lets a
client choose which tenant domain the app renders. List only ranges belonging to a
proxy that sets or strips those headers itself.

## nginx

T󠄁h󠄁e󠄁s󠄁e󠄁 s󠄁t󠄁e󠄁p󠄁s󠄁 u󠄁s󠄁e󠄁 D󠄁e󠄁b󠄁i󠄁a󠄁n󠄁/󠄁U󠄁b󠄁u󠄁n󠄁t󠄁u󠄁'󠄁s󠄁 `sites-available` l󠄁a󠄁y󠄁o󠄁u󠄁t󠄁.󠄁 R󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁
`secrets.example.com` w󠄁i󠄁t󠄁h󠄁 y󠄁o󠄁u󠄁r󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁c󠄁 h󠄁o󠄁s󠄁t󠄁n󠄁a󠄁m󠄁e󠄁 t󠄁h󠄁r󠄁o󠄁u󠄁g󠄁h󠄁o󠄁u󠄁t󠄁.󠄁 I󠄁t󠄁s󠄁 D󠄁N󠄁S󠄁 m󠄁u󠄁s󠄁t󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁
t󠄁o󠄁 t󠄁h󠄁i󠄁s󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁r󠄁,󠄁 w󠄁i󠄁t󠄁h󠄁 T󠄁C󠄁P󠄁 p󠄁o󠄁r󠄁t󠄁s󠄁 8󠄁0󠄁 a󠄁n󠄁d󠄁 4󠄁4󠄁3󠄁 r󠄁e󠄁a󠄁c󠄁h󠄁a󠄁b󠄁l󠄁e󠄁.󠄁 K󠄁e󠄁e󠄁p󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁'󠄁s󠄁 p󠄁o󠄁r󠄁t󠄁 p󠄁r󠄁i󠄁v󠄁a󠄁t󠄁e󠄁.󠄁

### 1󠄁.󠄁 S󠄁t󠄁a󠄁r󠄁t󠄁 w󠄁i󠄁t󠄁h󠄁 H󠄁T󠄁T󠄁P󠄁 f󠄁o󠄁r󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁a󠄁t󠄁i󠄁o󠄁n󠄁

O󠄁n󠄁 a󠄁 f󠄁r󠄁e󠄁s󠄁h󠄁 h󠄁o󠄁s󠄁t󠄁 t󠄁h󠄁e󠄁r󠄁e󠄁 a󠄁r󠄁e󠄁 n󠄁o󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 y󠄁e󠄁t󠄁.󠄁 I󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁 n󠄁g󠄁i󠄁n󠄁x󠄁 a󠄁n󠄁d󠄁 C󠄁e󠄁r󠄁t󠄁b󠄁o󠄁t󠄁:󠄁

```bash
sudo apt install nginx certbot
sudo install -d -m 0755 /var/www/html/.well-known/acme-challenge
```

C󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 `/etc/nginx/sites-available/onetimesecret` w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁i󠄁s󠄁 H󠄁T󠄁T󠄁P󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁.󠄁
I󠄁t󠄁 s󠄁e󠄁r󠄁v󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 A󠄁C󠄁M󠄁E󠄁 c󠄁h󠄁a󠄁l󠄁l󠄁e󠄁n󠄁g󠄁e󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 e󠄁x󠄁p󠄁o󠄁s󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 o󠄁v󠄁e󠄁r󠄁 H󠄁T󠄁T󠄁P󠄁:󠄁

```nginx
server {
    listen 80;
    server_name secrets.example.com;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        default_type text/plain;
        try_files $uri =404;
    }

    location / {
        return 404;
    }
}
```

E󠄁n󠄁a󠄁b󠄁l󠄁e󠄁 t󠄁h󠄁e󠄁 s󠄁i󠄁t󠄁e󠄁 o󠄁n󠄁c󠄁e󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 t󠄁e󠄁s󠄁t󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁l󠄁o󠄁a󠄁d󠄁:󠄁

```bash
sudo ln -s /etc/nginx/sites-available/onetimesecret /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

I󠄁f󠄁 t󠄁h󠄁e󠄁 s󠄁y󠄁m󠄁l󠄁i󠄁n󠄁k󠄁 a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁s󠄁,󠄁 k󠄁e󠄁e󠄁p󠄁 i󠄁t󠄁.󠄁 C󠄁o󠄁n󠄁f󠄁i󠄁r󠄁m󠄁 t󠄁h󠄁e󠄁 c󠄁h󠄁a󠄁l󠄁l󠄁e󠄁n󠄁g󠄁e󠄁 p󠄁a󠄁t󠄁h󠄁 i󠄁s󠄁 r󠄁e󠄁a󠄁c󠄁h󠄁a󠄁b󠄁l󠄁e󠄁
f󠄁r󠄁o󠄁m󠄁 o󠄁u󠄁t󠄁s󠄁i󠄁d󠄁e󠄁 y󠄁o󠄁u󠄁r󠄁 n󠄁e󠄁t󠄁w󠄁o󠄁r󠄁k󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 i󠄁s󠄁s󠄁u󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁.󠄁 C󠄁e󠄁r󠄁t󠄁b󠄁o󠄁t󠄁'󠄁s󠄁 w󠄁e󠄁b󠄁r󠄁o󠄁o󠄁t󠄁
p󠄁l󠄁u󠄁g󠄁i󠄁n󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 u󠄁n󠄁d󠄁e󠄁r󠄁 `/var/www/html/.well-known/acme-challenge/`,󠄁 w󠄁h󠄁i󠄁c󠄁h󠄁 n󠄁g󠄁i󠄁n󠄁x󠄁 m󠄁u󠄁s󠄁t󠄁
s󠄁e󠄁r󠄁v󠄁e󠄁 a󠄁t󠄁 t󠄁h󠄁e󠄁 s󠄁a󠄁m󠄁e󠄁 U󠄁R󠄁L󠄁;󠄁 s󠄁e󠄁e󠄁 t󠄁h󠄁e󠄁 [C󠄁e󠄁r󠄁t󠄁b󠄁o󠄁t󠄁 w󠄁e󠄁b󠄁r󠄁o󠄁o󠄁t󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁m󠄁e󠄁n󠄁t󠄁s󠄁](https://eff-certbot.readthedocs.io/en/stable/using.html#webroot).󠄁

```bash
sudo certbot certonly --webroot -w /var/www/html -d secrets.example.com
```

C󠄁o󠄁n󠄁t󠄁i󠄁n󠄁u󠄁e󠄁 o󠄁n󠄁l󠄁y󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁 i󠄁s󠄁s󠄁u󠄁a󠄁n󠄁c󠄁e󠄁 s󠄁u󠄁c󠄁c󠄁e󠄁e󠄁d󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁.󠄁 I󠄁f󠄁 y󠄁o󠄁u󠄁
a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 h󠄁a󠄁v󠄁e󠄁 v󠄁a󠄁l󠄁i󠄁d󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁s󠄁,󠄁 s󠄁k󠄁i󠄁p󠄁 i󠄁s󠄁s󠄁u󠄁a󠄁n󠄁c󠄁e󠄁 a󠄁n󠄁d󠄁 u󠄁s󠄁e󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 p󠄁a󠄁t󠄁h󠄁s󠄁 b󠄁e󠄁l󠄁o󠄁w󠄁.󠄁

### 2󠄁.󠄁 E󠄁n󠄁a󠄁b󠄁l󠄁e󠄁 H󠄁T󠄁T󠄁P󠄁S󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁 i󠄁s󠄁s󠄁u󠄁a󠄁n󠄁c󠄁e󠄁

R󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁 t󠄁h󠄁e󠄁 H󠄁T󠄁T󠄁P󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 f󠄁o󠄁l󠄁l󠄁o󠄁w󠄁i󠄁n󠄁g󠄁.󠄁 K󠄁e󠄁e󠄁p󠄁 t󠄁h󠄁e󠄁 c󠄁h󠄁a󠄁l󠄁l󠄁e󠄁n󠄁g󠄁e󠄁
l󠄁o󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 f󠄁o󠄁r󠄁 r󠄁e󠄁n󠄁e󠄁w󠄁a󠄁l󠄁s󠄁;󠄁 r󠄁e󠄁d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁 o󠄁t󠄁h󠄁e󠄁r󠄁 H󠄁T󠄁T󠄁P󠄁 r󠄁e󠄁q󠄁u󠄁e󠄁s󠄁t󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 `location /`:󠄁

```nginx
# /etc/nginx/sites-available/onetimesecret
server {
    listen 80;
    server_name secrets.example.com;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        default_type text/plain;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name secrets.example.com;

    ssl_certificate     /etc/letsencrypt/live/secrets.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/secrets.example.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $remote_addr;
        proxy_set_header X-Client-IP       "";
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

`X-Forwarded-For $remote_addr` is the overwrite. Under depth mode with a depth of
2 or more, and only then, replace it with
`proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`.

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 3󠄁.󠄁 R󠄁e󠄁l󠄁o󠄁a󠄁d󠄁 n󠄁g󠄁i󠄁n󠄁x󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 r󠄁e󠄁n󠄁e󠄁w󠄁a󠄁l󠄁

W󠄁e󠄁b󠄁r󠄁o󠄁o󠄁t󠄁 i󠄁s󠄁s󠄁u󠄁a󠄁n󠄁c󠄁e󠄁 d󠄁o󠄁e󠄁s󠄁 n󠄁o󠄁t󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁 t󠄁h󠄁e󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 i󠄁n󠄁t󠄁o󠄁 n󠄁g󠄁i󠄁n󠄁x󠄁.󠄁 A󠄁d󠄁d󠄁 a󠄁 d󠄁e󠄁p󠄁l󠄁o󠄁y󠄁 h󠄁o󠄁o󠄁k󠄁
s󠄁o󠄁 s󠄁u󠄁c󠄁c󠄁e󠄁s󠄁s󠄁f󠄁u󠄁l󠄁 r󠄁e󠄁n󠄁e󠄁w󠄁a󠄁l󠄁s󠄁 r󠄁e󠄁l󠄁o󠄁a󠄁d󠄁 i󠄁t󠄁:󠄁

```bash
sudo install -d -m 0755 /etc/letsencrypt/renewal-hooks/deploy
printf '#!/bin/sh\nnginx -t && systemctl reload nginx\n' |
  sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx >/dev/null
sudo chmod 0755 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx
```

C󠄁h󠄁e󠄁c󠄁k󠄁 t󠄁h󠄁e󠄁 r󠄁e󠄁n󠄁e󠄁w󠄁a󠄁l󠄁 t󠄁i󠄁m󠄁e󠄁r󠄁 a󠄁n󠄁d󠄁 r󠄁u󠄁n󠄁 `certbot renew --dry-run` a󠄁s󠄁 d󠄁e󠄁s󠄁c󠄁r󠄁i󠄁b󠄁e󠄁d󠄁 b󠄁e󠄁l󠄁o󠄁w󠄁.󠄁
T󠄁h󠄁e󠄁 d󠄁r󠄁y󠄁 r󠄁u󠄁n󠄁 t󠄁e󠄁s󠄁t󠄁s󠄁 r󠄁e󠄁n󠄁e󠄁w󠄁a󠄁l󠄁;󠄁 t󠄁o󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁 t󠄁h󠄁e󠄁 h󠄁o󠄁o󠄁k󠄁 w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 c󠄁u󠄁r󠄁r󠄁e󠄁n󠄁t󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁,󠄁 r󠄁u󠄁n󠄁
`sudo /etc/letsencrypt/renewal-hooks/deploy/reload-nginx`.󠄁

## Caddy

Caddy obtains and renews certificates itself, so the Let's Encrypt section below
does not apply to a Caddy deployment.

Two things have to be true together. The server-level `trusted_proxies` block
tells Caddy which peers may be believed when it resolves `{client_ip}`; without
it, `{client_ip}` is simply the address that connected, which is correct for a
bare Caddy and wrong for a Caddy behind a CDN. The `header_up` lines then write
that resolved address into the headers the app reads.

```text
{
	email you@example.com

	servers {
		trusted_proxies static private_ranges
		client_ip_headers X-Forwarded-For X-Real-IP
	}
}

secrets.example.com {
	reverse_proxy 127.0.0.1:3000 {
		header_up X-Forwarded-Proto {http.request.scheme}
		header_up X-Forwarded-For {client_ip}
		header_up X-Real-IP {client_ip}
		header_up -X-Client-IP
	}
}
```

If Caddy itself sits behind another proxy or a CDN, declare that upstream's ranges
in `trusted_proxies` — otherwise `{client_ip}` resolves to the upstream and you
have written the wrong address with full confidence. Under depth mode with a depth
of 2 or more, drop the `X-Forwarded-For` line and let Caddy append, preserving the
hop chain.

## Apache

```apache
# /etc/apache2/sites-available/onetimesecret.conf
<VirtualHost *:80>
    ServerName secrets.example.com
    Redirect permanent / https://secrets.example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName secrets.example.com

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/secrets.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/secrets.example.com/privkey.pem

    # Drop whatever the client sent, then let mod_proxy_http add exactly one
    # entry — the real peer. That is the overwrite, done the Apache way.
    RequestHeader unset X-Forwarded-For
    RequestHeader unset X-Real-IP
    RequestHeader unset X-Client-IP
    RequestHeader set X-Forwarded-Proto "https"

    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

Apache appends the client address to `X-Forwarded-For` on its own, so there is no
directive to write the peer address directly. Unsetting the inbound header first
leaves exactly one entry — the one Apache adds. Under depth mode with a depth of
2 or more, drop the `X-Forwarded-For` unset so the inbound chain survives.
Requires `mod_headers`, `mod_proxy` and `mod_proxy_http`.

## TLS certificates

### Let's Encrypt

F󠄁o󠄁r󠄁 nginx,󠄁 u󠄁se󠄁 t󠄁h󠄁e󠄁 H󠄁T󠄁T󠄁P󠄁-󠄁f󠄁i󠄁r󠄁s󠄁t󠄁 w󠄁e󠄁b󠄁r󠄁o󠄁o󠄁t󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁d󠄁ur󠄁e󠄁 a󠄁b󠄁ov󠄁e󠄁.󠄁 D󠄁o󠄁 n󠄁o󠄁t󠄁 e󠄁n󠄁ab󠄁l󠄁e󠄁 a󠄁 T󠄁L󠄁S󠄁
c󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁tio󠄁n t󠄁h󠄁a󠄁t󠄁 n󠄁a󠄁m󠄁e󠄁s certi󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 be󠄁f󠄁or󠄁e󠄁 those f󠄁i󠄁l󠄁es exi󠄁s󠄁t󠄁.

For Apache o󠄁n󠄁 a󠄁 f󠄁r󠄁e󠄁s󠄁h󠄁 h󠄁o󠄁s󠄁t󠄁,󠄁 f󠄁i󠄁r󠄁s󠄁t󠄁 e󠄁n󠄁a󠄁b󠄁l󠄁e󠄁 a󠄁n󠄁 H󠄁T󠄁T󠄁P󠄁-󠄁o󠄁n󠄁l󠄁y󠄁 v󠄁i󠄁r󠄁t󠄁ua󠄁l󠄁 h󠄁o󠄁st󠄁 w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e
c󠄁o󠄁r󠄁r󠄁e󠄁c󠄁t󠄁 `ServerName`,󠄁 w󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 T󠄁L󠄁S󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁i󠄁v󠄁e󠄁s󠄁 o󠄁r󠄁 a󠄁 r󠄁e󠄁d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁 t󠄁o󠄁 H󠄁T󠄁T󠄁P󠄁S󠄁.󠄁 I󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁
`certbot` a󠄁n󠄁d󠄁 `python3-certbot-apache`,󠄁 t󠄁h󠄁e󠄁n r󠄁u󠄁n󠄁
`sudo certbot --apache -d secrets.example.com`.󠄁 A󠄁f󠄁t󠄁e󠄁r󠄁 i󠄁s󠄁s󠄁u󠄁anc󠄁e󠄁,󠄁 a󠄁dapt the A󠄁pa󠄁c󠄁h󠄁e󠄁
H󠄁T󠄁T󠄁P󠄁S󠄁 e󠄁x󠄁a󠄁m󠄁p󠄁l󠄁e󠄁 a󠄁b󠄁ov󠄁e󠄁 to󠄁 the resulting c󠄁e󠄁r󠄁t󠄁i󠄁fic󠄁a󠄁t󠄁e󠄁 p󠄁a󠄁t󠄁h󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 A󠄁p󠄁a󠄁c󠄁h󠄁e󠄁 p󠄁lu󠄁g󠄁i󠄁n󠄁
i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁e󠄁r󠄁t󠄁i󠄁f󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 a󠄁n󠄁d󠄁 m󠄁a󠄁n󠄁a󠄁g󠄁es relo󠄁a󠄁d󠄁s󠄁;󠄁 n󠄁g󠄁i󠄁n󠄁x󠄁'󠄁s󠄁 m󠄁a󠄁n󠄁u󠄁a󠄁l󠄁 w󠄁e󠄁b󠄁r󠄁o󠄁o󠄁t󠄁 m󠄁e󠄁t󠄁h󠄁o󠄁d󠄁
n󠄁e󠄁e󠄁d󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁p󠄁l󠄁o󠄁y󠄁 h󠄁o󠄁o󠄁k󠄁 s󠄁h󠄁o󠄁w󠄁n󠄁 a󠄁b󠄁o󠄁v󠄁e󠄁.

Renewal is already automated. The certbot packages install a systemd timer, so
confirm it rather than scheduling anything:

```bash
systemctl list-timers certbot.timer
sudo certbot renew --dry-run
```

If the timer is not active, `sudo systemctl enable --now certbot.timer`. Do not
add a renewal line to `/etc/crontab`: that file requires a user field between the
schedule and the command, so a five-field line is rejected outright, and the
timer already covers it.

### Custom certificates

Place the certificate and key where the proxy expects them and set the
permissions before reloading:

```bash
sudo install -m 644 fullchain.pem /etc/ssl/certs/secrets.example.com.crt
sudo install -m 600 privkey.pem   /etc/ssl/private/secrets.example.com.key
```

Then update `ssl_certificate` / `ssl_certificate_key` (nginx) or
`SSLCertificateFile` / `SSLCertificateKeyFile` (Apache) to match, and reload.

## Tell the app it is behind HTTPS

Terminating TLS at the proxy is not enough on its own. Three things decide what
the app believes about the request, and getting them wrong produces symptoms that
do not look like configuration errors.

Set `HOST` to the public hostname on the certificate, including the port if it is
not the standard one for the scheme. It is what the app generates links against.

Set `SSL=true`. It is off unless you set it, and what it governs is link
generation: share URLs and the links in outgoing email are written as `https`.
It also forces the session cookie's `Secure` flag on. It does not make the app
serve HTTPS; the app has no TLS listener at all.

Leaving `SSL` off does not turn that flag off. The shipped configuration omits
the session `secure` key entirely unless `SSL=true`, and the boot-time fallback
then derives it from `site.ssl` **or** `RACK_ENV=production`. The published image
and both Compose stacks run `RACK_ENV=production`, so on an ordinary deployment
the session cookie is `Secure` whether or not you set `SSL`.

Make sure the proxy sends `X-Forwarded-Proto: https`. All three configurations
above do. If your TLS terminator does not — Cloudflare Tunnel, for instance —
set `ASSUME_HTTPS=true` instead.

**The trap.** The session cookie is `Secure` on any production deployment, and
Rack will not write a `Secure` cookie on a request it believes is plain HTTP. It
returns early and the session is never persisted. The response looks normal.
Sign-in appears to succeed and then the user is not signed in, on every attempt,
with nothing in the browser to explain it. Because the flag does not depend on
`SSL`, an instance running with `SSL` unset is exposed to this too. The app logs
the diagnosis:

```text
[Session] cookie NOT written: secure cookie over a request the app sees as non-SSL. Behind a TLS-terminating proxy, forward X-Forwarded-Proto: https or set ASSUME_HTTPS=true.
```

It is throttled to one line per process per interval, so a single occurrence in
the log can stand for every failed sign-in.

`ASSUME_HTTPS` is off by default and is independent of the trusted-proxy
settings. It is upgrade-only: it marks a request that does not already look like
HTTPS as HTTPS before anything downstream reads the scheme. Never set it on an
origin that clients can reach directly, because it would have the app treat a
genuine plain-HTTP client as secure. And never pair it with `SSL` left off:
generated share links and emails would emit `http://` while clients use `https`,
downgrading every URL the app produces.

## Confirm it through the proxy

Both failure modes above are silent, so prove the path before you announce the
hostname. [Verify your install](/en/install/verify) has the checks; point the
smoke assertion at the public HTTPS URL rather than at `127.0.0.1`, because only
a request that has actually crossed the proxy exercises the forwarded headers and
the session cookie. The health endpoints stay a loopback check either way.
