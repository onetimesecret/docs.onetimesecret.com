---
layout: post
title: UI/UX Updates - September '24
date: 2024-09-03
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/onetime-one-button-20240902-after.jpeg
badge:
  label: Product
readingTime: 2
---


Some recent updates. I'm still working on the new design, moving the UI from purely old-school, server-rendered [mustache]() templates to Vue 3 components. I've been making some incremental improvements here and there.

## ["Or generate a random password" is confusing" #286](https://github.com/onetimesecret/onetimesecret/issues/286)

The old layout was a bit confusing. The "Or generate a random password" button was too close to the "Create a secret" button. It was also not clear that the "Or generate a random password" button was a separate action. I've moved it to the bottom of the form and made it more visually distinct.

::ImageModal{src="/img/blog/2024/312443323-1455900d-d6b4-42e4-b4e8-8dffdcda1fe7.png" alt="Older layout from June" width="320" height="320"}
::

I made a quick fix a couple months ago, but I wasn't happy with it (and neither was the original issue reporter).

::ImageModal{src="/img/blog/2024/onetime-one-button-20240902-before.png" alt="Older layout from June" width="320" height="320"}
::

I've now made a more permanent change. I've shrunken the "Or generate a random password" button to just a side just a sidepiece of the main "Create a secret" button. I've also added a key icon to make it more visually distinct.

::ImageModal{src="/img/blog/2024/onetime-one-button-20240902.gif" alt="The One Button in Motion" width="320" height="320"}
::

## [Integrate Altcha for non-authenticated user feedback #604](https://github.com/onetimesecret/onetimesecret/issues/604)

We re-enabled feedback functionality for non-authenticated users from the ubiquitous feedback button at the bottom of the homepage. To achieve this, we integrated [Altcha](), an opensource and privacy-focused captcha service, to ensure that spam and abuse are minimized while still allowing for valuable user feedback. This was one of our earliest features and we got a lot of valuable feedback from it. We also missed a lot of stuff I'm sure b/c there was so much spam.

::ImageModal{src="/img/blog/2024/onetime-mucho-feedback-20240904.gif" alt="Feedback Button" width="320" height="320"}
::

I'll write more about Altcha in a future post. It's a really cool project and I'm Bram Stokered to be using it.


## [Add Language Dropdown, Enhance UI Elements, and Update Configuration #593](https://github.com/onetimesecret/onetimesecret/issues/593)

Added a language selection dropdown in the bottom right corner of the footer.

::ImageModal{src="/img/blog/2024/language toggle.png" alt="Language Toggle" width="320" height="320"}
::

::ImageModal{src="/img/blog/2024/language toggle2.png" alt="Language Toggle" width="320" height="320"}
::

It's the same functionality that was available from the translations page, but now it's more accessible. I also updated the configuration to allow for more languages to be added in the future.

On the i18n front, the codebase is overdue for getting caught up on translation strings. I'll be working on that in the coming weeks so that our existing translations can be used in the Vue components and then get all of the new strings translated.
