---
title: Setup Guide
description: This guide will walk you through the process of setting up a custom domain for your Onetime Secret account, including the differences between subdomains and apex domains, and choosing your preferred data center region.
---

# Custom Domain Setup Guide

## Prerequisites

- An active Onetime Secret account with custom domain feature enabled
- A domain you own and can manage DNS settings for

## Understanding Domain Types

Before setting up your custom domain, it's important to understand the difference between subdomains and apex domains:

1. **Subdomain**: A subdivision of your main domain (e.g., secrets.yourdomain.com)
2. **Apex Domain**: The root domain itself (e.g., yourdomain.com)

## Choose Your Region

Onetime Secret offers multiple data center regions: EU, UK, US, CA, and NZ. When setting up your custom domain, you'll need to choose which region you prefer for storing your data. This choice is important for several reasons:

- **For Individuals**: You can choose based on your personal preference, such as proximity for potentially faster access or personal data sovereignty concerns.
- **For Businesses**: Your choice may depend on your data locality obligations, such as compliance with GDPR, state, or provincial guidelines. Ensure you select the region that best aligns with your regulatory requirements.

Consider your specific needs and requirements when making this choice. For more detailed information about our data center regions and how to choose the right one for your needs, please refer to our [Data Center Regions](/en/regions) guide.

## Step 1: Access Domains Dashboard

1. Log in to your Onetime Secret account
2. Navigate to Dashboard > Custom Domains
3. Click "Add Domain"

<img src="/img/docs/custom-domains/3-Custom-domains.png" alt="Custom domains view" width="400" />

## Step 2: Enter Your Domain

1. In the custom domain settings, enter your desired domain (e.g., secrets.yourdomain.com or yourdomain.com)
2. Click "Add Domain" or equivalent button to proceed

## Step 3: Configure DNS Settings

To connect your domain, you need to update your DNS settings. The process differs slightly depending on whether you're using a subdomain or an apex domain, and which data center region you choose.

### For Subdomains (Recommended)

1. Access your domain's DNS management panel (through your domain registrar or DNS provider)
2. Create a CNAME record with the following details:
   - Host: Your chosen subdomain (e.g., secrets)
   - Points to / Value:
     - For EU region: identity.eu.onetime.co
     - For UK region: identity.ingress.onetime.co
     - For US region: identity.us.onetime.co
     - For CA region: identity.ca.onetime.co
     - For NZ region: identity.nz.onetime.co
3. Remove any existing A, AAAA, or CNAME records for the same subdomain

### For Apex Domains

1. Access your domain's DNS management panel
2. Create or modify an A record with the following details:
   - Host: @ (or leave blank, depending on your DNS provider)
   - Points to / Value:
     - For EU region: 109.105.217.207
     - For US region: 66.51.126.41
     - For other regions: Contact support for current A record IP addresses

Important: Ensure there are no conflicting records for the domain you're using.

<img src="/img/docs/custom-domains/4-Custom-domain-settings.png" alt="Custom domain settings" width="400" />

### More Info

#### Why CNAME for Subdomains?

We recommend using CNAME records for subdomains because:

1. They're more flexible and allow us to change our server IP addresses without requiring you to update your DNS settings.
2. They automatically adapt to any changes we make to our infrastructure.

#### Why A Records for Apex Domains?

Apex domains cannot use CNAME records due to DNS standards. Therefore, we must use A records, which have some limitations:

1. If we change our IP address (which is rare), you'll need to update your DNS settings manually.
2. They don't automatically adapt to changes in our infrastructure.

## Step 4: Verify Domain and Wait for SSL

1. After updating DNS settings, return to the Onetime Secret custom domain page
2. The system will automatically attempt to verify your domain
3. SSL certificate generation will begin once verification is successful
4. This process may take a few minutes to complete

## Step 5: Confirm Setup

Once setup is complete, you should see the following information:

- Domain Status: Active with SSL
- Target Address: The identity endpoint for your chosen region (e.g. identity.eu.onetime.co, identity.ingress.onetime.co, identity.us.onetime.co)
- SSL Status: Active
- SSL Renewal Date: (Will be displayed, typically about a year from setup)

## Troubleshooting

- If verification fails, double-check your DNS settings
- Ensure you've removed any conflicting records
- DNS propagation can take up to 24 hours, though it's usually much faster

## Using Your Custom Domain

Once active, your secret links will use your custom domain. For example:
`https://secrets-example.onetime.dev/secret/abc123`

## We've Got You Covered

We handle the rest of the technical details so you don't have to.

- We continuously monitor your domain's status
- SSL certificates are automatically renewed without any action required on your part

For those who like to stay informed, you can easily check the health of your domain:

- Simply look at the "Last Monitored" timestamp in your dashboard to confirm ongoing connectivity

## Questions or Need Support?

We're here to help. If you have any questions or need assistance:

- Email us directly at support@onetimesecret.com
- Use our feedback form at https://onetimesecret.com/feedback

Our team is committed to providing you with the best possible support for your custom domain setup and usage, including guidance on choosing the right data center region for your needs.
