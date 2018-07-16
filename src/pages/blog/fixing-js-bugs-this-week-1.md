---
templateKey: blog-post
title: 'Fixing JS Bugs This Week #1'
date: '2018-07-15T20:24:21-04:00'
description: 'This week, we fixed a couple of bugs that'
tags:
  - fixing bugs
category: javascript
image: /img/artboard-–-2.png
published: false
---
# Bug # 1

Always remember to stringify what you send over the web.

I ran into this problem when I was working on saving the value selected in a dropdown list to my backend.

I noticed that everytime I select the first value in my dropdown list and clicked "Save", the change did not persist to the backend. 

I quickly realized that reason was because the value of the first option in my dropdown is the number, 0.

And 0 == false == undefined.

Therefore, let's not forget to surround your numeric values with a `JSON.stringify` before you attach it to an API call.

```
return {
  coop_program: JSON.stringify(profileInfo.coopProgram),
  disability: JSON.stringify(profileInfo.disability),
  gpa: JSON.stringify(profileInfo.gpa),
  international_student: JSON.stringify(
     profileInfo.internationalStudent
  ),
  gender_id: JSON.stringify(get(profileInfo, 'gender.gender_id')),
  visible_minority_background_id:
            JSON.stringify(get(profileInfo, 'visibleMinorityBackgroundId.visible_minority_background_id')),
          indigenous_aboriginal_id:
            JSON.stringify(get(profileInfo, 'indigeneousAboriginalId.indigenous_aboriginal_id')),
          resume: profileInfo.resume,
          transcript: profileInfo.transcript
        }
```

So here's what happened here. We use a dropdown.

# Bug #2

Quill JS, we had to make our very own component for this because of the error we kept getting. https://github.com/quilljs/quill/issues/1940 "The given range isn't in document".

It just kept on re-rendering the page every time that we'd update the store and jump around, making it impossible to fill out the fields on screen.

We fixed it by leveraging internal state and putting it in it's own component.
