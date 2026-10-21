---
title: Branding your domain
description: Add your logo, favicon, brand color, corner style, font and reveal instructions to the pages recipients see on your custom domain.
plan: Identity Plus
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — src/apps/workspace/domains/DomainDetail.vue:194-201 and DomainBrand.vue:66,83-86 (Manage Brand, Brand and Delivery tabs, Update); src/apps/workspace/components/dashboard/brand/SimpleBrandPanel.vue and src/shared/utils/brand-helpers.ts:216-275 (fields and options); src/apps/workspace/components/domains/DeliveryPanel.vue:53-108 (language, reveal instructions); apps/api/domains/logic/domains/update_domain_image.rb:16-19,96-122,200-205 and lib/onetime/image_content.rb (accepted image types and sizes); src/apps/workspace/components/domains/ImageUploadModal.vue:30,53-54 and BrandFaviconField.vue:36-37 (upload form limits); apps/web/core/middleware/request_setup.rb:90-96 and apps/web/core/logic/page.rb:117,124 (branded pages not cached; favicon cached one day); apps/api/domains/logic/domains/update_domain_brand.rb:35-42,126-128 and domain_config_authorization.rb:148-155 (custom_branding plus manage_org); locales/content/en/workspace-branding.json
---

Branding changes how the pages on your custom domain look to the people you
share with: the page where a recipient reveals a secret, and your domain's
homepage.

## Before you start

- Your organization is on **Identity Plus** or **Team Plus**.
- You are the organization's **owner**. Admins can open the brand settings but
  cannot save them.
- The domain has been added to your organization. See
  [Setting up a custom domain](/en/custom-domains/setup-guide).
- Your logo is a JPEG, PNG, GIF, WebP, BMP or TIFF file of up to 1 MB. SVG is
  not accepted. A square image of about 128 × 128 pixels is recommended.
- If you want a favicon other than your logo, have a PNG or ICO file of up to
  256 KB.

## Open the brand settings

1. Open the user menu and choose **Domains**.
2. Choose **Manage** next to the domain.
3. Under **Features**, choose **Manage Brand**.

The page has two tabs, **Brand** and **Delivery**, and a preview of the
recipient page that updates as you edit.

## Add or replace your logo

1. On the **Brand** tab, under **Logo**, choose **Upload logo** (or
   **Replace** if there is already one).
2. In the **Domain logo** window, choose an image or drag it in.
3. Choose **Save logo**.

The logo is saved straight away; you do not need to choose **Update**
afterwards.

To remove the logo, choose **Replace**, then **Remove logo**, and confirm with
**Remove logo**.

## Set the favicon

Without a favicon of your own, the browser tab shows the icon fetched from your
domain's website, if one was found, and otherwise your logo.

- To use your own, under **Favicon** choose **Upload favicon**, pick a PNG or
  ICO file, and choose **Save favicon**.
- To fetch the icon from your domain again, choose **Refresh favicon from
  domain**. A favicon you uploaded is not replaced.
- To remove an uploaded favicon, choose **Remove favicon**.

## Set color, corners and font

On the **Brand** tab:

- **Brand Color**: the color used for buttons and accents. The button text
  switches between light and dark automatically to stay readable.
- **Corners**: **Square**, **Rounded** or **Extra Rounded**.
- **Font Family**: **Serif**, **Sans Serif**, **Monospace** or **System UI**.

Choose **Update** to save. The button is available only when something has
changed. If saving fails, the form returns to the last saved values.

## Set language and reveal instructions

On the **Delivery** tab:

- **Language**: the default language for recipient pages and emails on this
  domain. Recipients can still switch language on the page. This card appears
  only where the service offers more than one language.
- **Reveal instructions**: text shown on the recipient page **Before reveal**
  and **After reveal**, up to 500 characters each. HTML is removed. Leave a
  field blank to use the built-in text in the selected language.

Choose **Update** to save.

## Check the result

Open a secret link on your domain, or your domain's homepage, and reload the
page. Saved changes appear on the next page load. Browsers can keep showing an
old favicon for up to a day.

## If your plan changes

If your organization moves to a plan without branding, the saved branding stays
on your domain, but it can no longer be changed.

## Related

- [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) —
  what visitors can do on your domain's homepage.
- [Email sender](/en/custom-domains/email-sender) — send secret-link emails
  from an address on your domain.
- [Custom domains](/en/custom-domains) — plans and who can manage a domain.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
