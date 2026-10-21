---
title: Compare plans
description: Compare our plans for secure secret sharing — expiring links, custom domains, branding, SSO, and team controls across Free, Identity Plus, and Team Plus.
audience: end-user
pageType: reference
sourceOfTruth: billing catalog (billing.yaml, docs snapshot sha256 69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501) plans.free_v1, plans.identity_plus_v1 and plans.team_plus_v1 entitlements and limits; onetimesecret at 145c1e7cfa — apps/api/organizations/logic/invitations/create_invitation.rb (member counts are logged, not enforced); apps/api/account/logic/account/get_permissions.rb#compute_assignable_roles (Admin offered only where role_admins_per_org is not 0); lib/onetime/models/organization_membership.rb:81,91 (audit_logs, ip_access_rules and workspace_branding keys; no enforcement code for the last two); commit 2462d9e1b3 (audit_logs granted on team_plus_v1 in the maintained catalog)
---

## Feature matrix

| Feature / Plan | Not signed in | Free | Identity Plus | Team Plus |
|---|---|---|---|---|
| Custom domains | ❌ | 1 | Unlimited | Unlimited |
| Homepage secrets | ❌ | ✅ | ✅ | ✅ |
| Incoming secrets | ❌ | ✅ | ✅ | ✅ |
| API access | Limited \* | ✅ | ✅ | ✅ |
| Custom branding (logo, color) | ❌ | ❌ | ✅ | ✅ |
| Custom email sender | ❌ | ❌ | ✅ | ✅ † |
| Custom privacy defaults | ❌ | ❌ | ✅ | ✅ |
| Per-domain sign-in configuration | ❌ | ❌ | ✅ | ✅ |
| Member invites | ❌ | ❌ | ✅ | ✅ |
| Admin role for members | ❌ | ❌ | ❌ | ✅ |
| Members per organization | — | 1 | No fixed limit | No fixed limit |
| Per-domain signup validation | ❌ | ❌ | ❌ | ✅ |
| Single sign-on (SSO) | ❌ | ❌ | ❌ | ✅ |
| Teams and shared dashboard | ❌ | ❌ | ❌ | ✅ |
| Secret Activity (audit logs) | ❌ | ❌ | ❌ | Beta |
| Secret lifetime | Up to 7 days | Up to 14 days | Up to 30 days | Up to 30 days |
| Choice of region (EU, UK, US, CA, NZ) | ✅ | ✅ | ✅ | ✅ |
| Encrypted in transit and at rest | ✅ | ✅ | ✅ | ✅ |
| Paid | No | No | Yes | Yes |

\* Without an account you can create, reveal and burn secrets through the API.
Creating secrets is rate-limited by network address, and there is no list of
your secrets, domains or organizations.

† Team Plus extends the custom email sender with a **flexible From domain**:
any domain, not just your custom domain.

The [pricing page](https://onetimesecret.com/pricing) shows the Free plan as
**Basic**, and lists current prices. Accounts on the earlier Identity Plus plan
see it as **Identity Plus (Early Supporter)**; it is no longer sold.

## Planned for Team Plus

These are not available yet:

- IP-based access rules
- Workspace branding for sign-in pages and email templates
