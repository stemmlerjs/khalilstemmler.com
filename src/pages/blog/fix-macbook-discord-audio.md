---
templateKey: blog-post
title: "Fix Macbook Audio Not Working on Discord"
date: '2018-11-25T00:05:27-04:00'
description: >-
  Use this script to fix Discord's audio problems on Mac.
tags:
  - Audio
  - Macbook
category: Apple
image: /img/macbook.jpeg
published: true
---

I recently started getting this problem where I wasn't able to hear any audio (nothing, not even system sounds) after having been on Discord on my Macbook Pro.

It would also mean that I'm not able to join a call and hear anyone's voices. Pretty annoying.

Try killing your current audio process with this command.


```bash
ps aux | grep 'coreaudio[d]' | awk '{print $2}' | xargs sudo kill
```

Or add it to your **~/.zshrc** so you can run it whenever the audio starts acting up again.

```bash
echo 'alias reset-audio="ps aux | grep 'coreaudio[d]' | awk '{print $2}' | xargs sudo kill"' >> ~/.zshrc
source ~/.zshrc
reset-audio
```

I hope it works for you!