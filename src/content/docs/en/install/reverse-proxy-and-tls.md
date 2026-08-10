---
title: Reverse proxy and TLS
description: How to terminate TLS in front of Onetime Secret without misattributing every client IP to the proxy or silently dropping the session cookie.
audience: operator
pageType: how-to
sidebar:
  label: Reverse proxy and TLS
  order: 5
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

```nginx
# /etc/nginx/sites-available/onetimesecret
server {
    listen 80;
    server_name secrets.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    http2 on;
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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/onetimesecret /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

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

```bash
# Debian/Ubuntu, nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d secrets.example.com
```

For Apache use `python3-certbot-apache` and `certbot --apache`. If your proxy
configuration is hand-written and you do not want certbot editing it, issue the
certificate on its own with
`sudo certbot certonly --webroot -w /var/www/html -d secrets.example.com` and
point the proxy at the resulting files yourself.

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
