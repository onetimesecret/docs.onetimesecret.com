---
layout: post
title: "Expanding Horizons: Introducing US Data Locality for Onetime Secret"
date: 2024-10-14
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/20241014-us-data-center-launch.svg
badge:
  label: Feature
readingTime: 11
---

We're jazzed to announce the launch of our new US data center, marking a significant expansion in our commitment to data privacy and user choice. This new offering, accessible via [us.onetimesecret.com](https://us.onetimesecret.com/), complements our existing EU data center at [eu.onetimesecret.com](https://eu.onetimesecret.com/), providing more options for our users worldwide.

![Onetime Secret Global Data Centers](/img/blog/2024/20241014-us-data-center-launch.svg)

## A Share-Nothing Architecture

At the core of this expansion is our dedication to a share-nothing architecture. This means that each data center operates independently, ensuring complete data isolation between regions. Here's what this means for you:

- **Separate Accounts**: Creating an account on `us.onetimesecret.com` is entirely separate from an account on `eu.onetimesecret.com`, even if you use the same email address.
- **No Cross-Center Operations**: You can't perform operations (like burning a secret) across data centers. Each center maintains its own set of secrets and user data.
- **Consistent Billing for Paid Users**: For paid accounts, while no user data is shared between centers, your subscription status is recognized across regions through our payment provider, Stripe.

## What This Means for Users

### For Anonymous Users
- Requests to onetimesecret.com may be routed to any active data center.
- The location of your secret is always clear from the generated link (e.g., `us.onetimesecret.com/secret/abcd1234`).
- You can choose a specific data locality by navigating directly to [us.onetimesecret.com](https://us.onetimesecret.com/) or [eu.onetimesecret.com](https://eu.onetimesecret.com/).

### For Authenticated Users
- When creating a new account, you must choose a data center location.
- You'll need to return to the same location to log in.
- Existing accounts and secrets remain in the EU data center (Nuremberg).

### For All Users
- Secrets created without a subdomain jurisdiction (e.g., onetimesecret.com/secret/efgh5678) will continue to default to our EU data center.
- All users, both paid and free, can choose their preferred data center when creating an account.

## Pricing and Plans

Our commitment to data locality extends to our pricing model:

- Charges are based on where you're paying from, not where your account is created.
- Identity Plus plans include unlimited custom domains across all data centers under a single subscription.

## Looking Ahead

We're not stopping here. Future plans include:

- Additional data center locations: Brazil, Australia, UK, and Canada.
- New features: Team accounts, custom logo/branding, and custom mail sender options.

## Why This Matters

Data locality is becoming increasingly important in our interconnected world. By offering multiple data center options, we're:

1. Enhancing data privacy and sovereignty
2. Improving performance for users in different regions
3. Providing more choice and control over where your sensitive data is stored

We believe this approach aligns with our core mission of providing secure, private, and efficient secret sharing while respecting global data regulations and user preferences.

## Get Started

Ready to try out our new US data center? Head over to us.onetimesecret.com to create an account or start sharing secrets today!

For any questions or feedback about our new data locality options, please don't hesitate to reach out to our support team.

Stay secure,
The Onetime Secret Team
