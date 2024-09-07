---
layout: post
title: "A verifiable error in our signup flow"
date: 2024-09-06
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/20240906-signups-glitch.svg
badge:
  label: Fail Friday
readingTime: 8
---

I introduced a bug a little over a week ago that prevented new users from verifying their accounts. Verification emails have been a bit of an issue over the years b/c there's no easy way to re-send them (I just haven't ever gotten around to it). In this case, the verification emails went out fine but when the user clicks the link it looks like it worked but underneath, it was actually updating the account record.

<InsetParagraph
  label="As an aside"
  image="/img/blog/2024/20240906-seal.svg"
  imageAlt="Descriptive text for the image"
  imagePosition="right">

  <p>There's a lot of code out there with test coverage so potent it can peel the paint off of a navy seal. But there's more to software quality than just the number and kinds of tests. Tests can have bugs too, and test coverage, although the name has a cozy ring to it, is not an all-encompassing panacea.</p>

  <p>The road to software hell is paved with good intentions. And that's not the focus of the post anyway. I'm getting distracted.</p>

</InsetParagraph>


Should there be tests for critical user flows like onboarding? Yes. Did I have them? No. Do I feel bad about it? Yes. Am I going to write tests for it? Eventually. Have I started writing them already? No. Will I write them soon? Possibly. Am I willing to accept the consequences? Always.


## Realizing there was abug

I didn't catch it until Thursday evening thanks to a helpful report from a user. By that point a few hundred accounts had been created. I [deployed a fix](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.17.1-rc4) right

and manually verified the accounts, but I still felt bad about it. I sent out an email to the affected users to apologize and let them know that their accounts were now verified. I also included a fortune cookie message at the end of the email to lighten the mood.





::ImageModal{src="/img/blog/2024/20240906-signups-glitch.svg" alt="Older layout from June" width="320" height="320"}
::

<!-- https://www.mca-marines.org/gazette/cultivating-intuitive-decisionmaking/# -->

Subject: We fixed it

Hello,

Delano here, founder of Onetime Secret. We had a small snafu with some new accounts over the past week. If you tried to log in and kept seeing a message about a verification link, that was us messing up, not you.

We went ahead and manually verified your account so you should be able to sign-in now without any trouble.

Dealing with account issues is annoying, so thank you for your patience. If you have any questions or run into any other issues, just hit reply to this email. I'm here to help.

Delano
https://onetimesecret.com/

P.S. Here's a special fortune for you: Distant connections bring valuable insights.
