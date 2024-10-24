---
layout: post
title: So the custom font was a whoopsies
date: 2024-09-02
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/font-364116997-3a83b03b-ef93-4c91-aede-1a3e0f1d66f2.png
badge:
  label: Product
readingTime: 2
---

So the new design has been up for about a month now. In my rush to get it out, I forgot to check the custom font in Safari. It's not loading. It's a bit of a whoopsies. I'm not sure what's going on. I'll have to look into it.

_[Custom Font Not Loading in Safari, Works in Chrome #598](https://github.com/onetimesecret/onetimesecret/issues/598)_


I look into it. It's definitely not loading in Safari. Or any other browser unless you happen to have the font installed locally. Cripes! How embarassing. It turns out I'd disabled the font settings in the Tailwind config file.


::ImageModal{src="/img/blog/2024/font-364116718-39ebbf8b-0d03-40cb-a59a-3efa7491e6ed.png" alt="Without the Custom Font, just a serif in general (Bad)" width="320" height="320"}
::

::ImageModal{src="/img/blog/2024/font-364116997-3a83b03b-ef93-4c91-aede-1a3e0f1d66f2.png" alt="With the Custom Font, Zilla Slab (Good)" width="320" height="320"}
::


::ImageModal{src="/img/blog/2024/Update font loading strategy for compatibility.jpeg" alt="Update font loading strategy for compatibility" width="320" height="320"}
::

Thankfully it was an easy fix to re-enable, doublecheck the paths were correct etc. I learned something interesting from the adventure: the difference in CSS between fontDisplay swap and fallback.

```css
{
  fontFamily: 'Zilla Slab',
  ...
  fontDisplay: 'fallback', # one of: auto, block, swap, fallback, optional
}
```

`swap` is the default. It's the best for performance but it can cause a flash of unstyled text (FOUT) if the font isn't available. `fallback` is different. It's slower but less likely to cause a FOUT because it waits for the font to load before displaying the text. It'll only apply the custom font if it loads within a certain time frame (typically 100ms).

The other font-display settings are:

1. `auto`: Lets the browser decide which behavior to use. It typically defaults to `swap`.

2. `block`: Similar to `fallback`, but with a longer timeout period (usually 3 seconds). It blocks text rendering until the custom font is available, potentially causing a noticeable delay in content display.

3. `optional`: Gives the browser the most control. It initially renders with the fallback font, then switches to the custom font only if it's already cached. This setting prioritizes performance over consistent font display across different page loads.

Each setting offers a different balance between performance and visual consistency, allowing developers to choose based on their specific needs and user experience priorities.
