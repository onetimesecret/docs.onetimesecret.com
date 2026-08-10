---
title: Images and variants
description: Which container image to deploy, what the S6, lite and Caddy variants are for, and how to pin the release you run.
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/docker/bake.hcl:106-116 (four build targets — main, s6, lite, caddy — of which the CI group builds three); onetimesecret/docker/bake.hcl:27-33,81-96 (both registries, and the repository-name suffix per variant); onetimesecret/docker/bake.hcl:67-69 (a local bake defaults to linux/amd64 alone unless PLATFORMS is set); onetimesecret/.github/workflows/build-and-publish-oci-images.yml:148-196,258-264 (which tags are immutable and which move, the targets the release workflow publishes, and the platforms it builds for); onetimesecret/Dockerfile:353-356,388-389,449-455 (the main image is the default build target and runs a single process as a non-root user); onetimesecret/Dockerfile:162,169-172,186-188 (BRAND_PACK bakes a pack in at build time and fails the build when the pack was never generated; BRAND_PACK / BRAND_ASSETS_DIR select one at run time instead); onetimesecret/docker/variants/README.md:31 and onetimesecret/docker/variants/lite.dockerfile:37-38,110-112 (the lite image bundles Redis, stays root, and is not for production); onetimesecret/docker/variants/caddy.dockerfile:111-118 (the Caddy image ships PUBLIC_DIR empty because the app serves its own assets); onetimesecret/docker/README.md:93-108 and onetimesecret/scripts/check-version-pins.sh:17-28 (pin a release rather than a moving tag, and the compose default must be an immutable vX.Y.Z)
---

## Run the main image

`onetimesecret/onetimesecret` is the image to deploy. It is the default build
target, and it is what both shipped Compose stacks and the project's own quick
start run. Everything else on this page is either a specialised build of it or a
companion service that sits in front of it.

The main image is single-process: one Puma web server started by the container
entrypoint, listening on port 3000, running as a non-root user (uid 1001), with
a health check baked in. It carries no datastore — the lite variant below is the
only image that does — so you run Valkey or Redis alongside it.

[Install with Docker](/en/install/docker) is the next page: it runs this image
under the two Compose stacks the project ships. If you are not running
containers at all, [Install on Linux](/en/install/linux) installs from a source
checkout instead — the `vX.Y.Z` release names below apply there too, as git tags
rather than image tags.

## Where the images are published

The project builds four images from one repository, and the release workflow
publishes three of them. Each published image goes to two registries under
matching names, so `ghcr.io/onetimesecret/<name>` and `onetimesecret/<name>` on
Docker Hub are interchangeable.

| Variant | Repository name | Published by the release workflow |
|---|---|---|
| Main | `onetimesecret` | yes |
| S6 | `onetimesecret-s6` | yes |
| Lite | `onetimesecret-lite` | yes |
| Caddy | `onetimesecret-caddy` | no — build it yourself |

Published images are built for `linux/amd64` and `linux/arm64`.

## Pin a release

Commands and Compose snippets throughout these pages name a shell variable
rather than a literal tag. Set it once per shell to the release you intend to
run, choosing it from the
[releases list](https://github.com/onetimesecret/onetimesecret/releases):

```bash
export OTS_VERSION=vX.Y.Z
```

Tags of the form `vX.Y.Z` are immutable and point at one release forever. The
rest move: `latest` follows the newest release, `next` follows release
candidates and pushes to `develop`, `edge` and a sanitized branch name follow any
branch push, `nightly` is rebuilt by a 03:00 UTC schedule, and `dev` is what a
manual build with no version input produces.

Pin an immutable tag. Releases before 1.0 can introduce breaking changes between
minor versions, which is why the shipped Compose stacks default their
`OTS_IMAGE_TAG` variable to a specific release rather than to `latest` — and why
a CI guard fails the build if that default drifts from the release the project's
own quick start names, or if it is set to a moving tag at all.

## The variants

### S6 — web, worker and scheduler supervised in one container

`onetimesecret-s6` is the application built on top of the s6-overlay supervisor,
which runs three processes in a single container: the web server, the email
worker and the scheduler. It restarts its own services on crash and coordinates
their shutdown, where the main image runs one process and leaves supervision to
Compose, systemd or your orchestrator. It is published to both registries
alongside the main image.

### Lite — demos and testing, never production

`onetimesecret-lite` is the main image with a Redis server installed inside it,
so a single container gives you a working instance with nothing else to set up.
It is ephemeral by design: the datastore lives in the container and every secret
is lost when that container stops. It also runs as root, because `redis-server`
needs write access the application user does not have. Use it for a demo, a
local trial or a throwaway test, and for nothing else.

### Caddy — the TLS proxy the full stack builds

`onetimesecret-caddy` is not the application. It is a custom Caddy build
carrying plugins that stock `caddy:2` does not have: `caddy-ratelimit`,
`caddy-security`, `transform-encoder`, and a configurable `caddy-dns` module for
DNS challenges. The release workflow does not publish it; the full Compose stack
builds it from `docker/variants/caddy.dockerfile` rather than pulling it.

It ships with `PUBLIC_DIR` empty on purpose. The application container serves its
own built assets, so the proxy static-serves only what exists under that
directory and proxies everything else — an empty directory means proxy
everything. Mounting assets in at run time is what makes Caddy serve them.

## Building the images yourself

Every image is built with Docker Bake from `docker/bake.hcl`. Invoking it with no
target builds the main image; the `all` group builds all four, and the `ci` group
builds the three the release workflow publishes. A local bake produces a
single-architecture image unless you set `PLATFORMS`.

A brand pack can be baked into the image at build time with
`--build-arg BRAND_PACK=<name>`, and the build fails outright if the named pack
was never generated. The same pack can also be selected at run time through
`BRAND_PACK` or `BRAND_ASSETS_DIR`, with no rebuild.
