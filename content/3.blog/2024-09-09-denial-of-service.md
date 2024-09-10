---
layout: post
title: "Denial of Service (DoS) Attack: A brief summary"
date: 2024-09-10
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/hetzner-graphs-lb-1h-20240909-0922.png
badge:
  label: Operations
readingTime: 4
---


I wanted to give you a quick update on what's been happening with Onetime Secret.

## What Happened

We had a rough day yesterday. A significant DoS attack hit us, taking the site down for over 8 hours. It was intense - we're talking about 15,000 connection attempts per second at its peak. That's... a lot.

I know we were radio silent during this time, and that's not ideal. We were heads-down trying to get things back up and running. It was a long, stressful day, but we managed to restore service.

## Key Points

Here's what we know so far:

1. The attack overwhelmed our systems, maxing out our CPU and disk I/O.
2. It came from multiple IP addresses with malformed HTTP headers.
3. As we brought services back up, they'd quickly go down again due to the load.

## Moving Forward

We're still investigating and will share a full post-mortem soon. This incident revealed some weak points in our infrastructure - which, while painful now, gives us a chance to improve and become more resilient.

To whoever was behind this attack: bravo, I guess? But seriously, can we all go home now?

I'm not going to sugarcoat it. This was a major disruption to our service, and that doesn't feel great. Actualyl it specifically feels bad. Our focus now is learning from this and making Onetime Secret better.

Thanks for your patience and understanding. We'll keep you updated as we know more.

---

## A few (technical) screenshots

I managed to get a few screenshots while the attack was happening. The first one shows the load balancer's connections on the scale of 1hour. This was taken from a couple hours into it and shows two spikes where we got the site back up only to go back down again shortly after.

The top chart is total open connections; the bottom chart is connections opening per second. We get up to around 50 open connections on a regular day. The two spikes were approaching 8000 with 15k connection attempts per second. Which seems like a little much.

#### 15,000 connections per second (sure, that's totally fine)

::ImageModal{src="/img/blog/2024/hetzner-graphs-lb-1h-20240909-0922.png" title="Hetzner Dashboard - DoS Attack Sept 9th, 2024" alt="Hetzner Dashboard - DoS Attack Sept 9th, 2024" width="320"}
::

#### Max CPU, 1GB/s disk I/O, only 40 packets per second (?)

This one is from the web server's perspective. 12 hours of mostly normal traffic and then whammo.

::ImageModal{src="/img/blog/2024/hetzner-graphs-lb-12h-20240909-0955am.jpeg" title="Hetzner Dashboard - DoS Attack Sept 9th, 2024" alt="Hetzner Dashboard - DoS Attack Sept 9th, 2024" width="320"}
::

#### Many IP addresses, bad HTTP headers, and a lot of traffic

::ImageModal{src="/img/blog/2024/web-server-logs-20240909-0730-example.png" title="Hetzner Dashboard - DoS Attack Sept 9th, 2024" alt="Hetzner Dashboard - DoS Attack Sept 9th, 2024" width="320"}
::

::ImageModal{src="/img/blog/2024/web-server-logs-20240909-0730-example2.png" title="Hetzner Dashboard - DoS Attack Sept 9th, 2024" alt="Hetzner Dashboard - DoS Attack Sept 9th, 2024" width="320"}
::
