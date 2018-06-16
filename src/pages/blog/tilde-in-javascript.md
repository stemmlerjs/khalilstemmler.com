---
templateKey: blog-post
title: What Does A Tilde Do In JavaScript?
date: '2017-11-16T10:04:10-05:00'
description: >-
  The tilde in JavaScript is actually surprisingly useful for shorthand
  determining the truthiness of a value.
tags:
  - JavaScript
category: Web Development
image: /img/artboard-–-2.png
published: true
---
It's not every day that you see a tilde in JavaScript.

I was taking a look through the source code for the Twit NPM library when I was creating a Twitter Bot and came across the following lines of code:

```
if(~followers.indexOf(target)) {  // do some action}
```

Notice the **tilde **on the first line? Let's find out what that's all about.

I [discovered that](https://stackoverflow.com/questions/12337360/javascript-tilde-twos-complement) when we use the ~ operator, it does -(A + 1) where A is the value to the right of the tilde. For example, we'd get -2 if we did this (since -(1 + 1) = -2):

```
~['apples', 'oranges'].indexOf('apples'); // => 0~['apples', 'oranges'].indexOf('oranges'); // => -2
```

Maybe you're like me and you're not really seeing the usefulness of using tilde yet. 

It turns out that it's _actually useful_ for determining the truthiness of a **numeric **value. It [flips all the bits in its operand](https://stackoverflow.com/questions/12299665/what-does-a-tilde-do-when-it-precedes-an-expression).

For a moment, let's just realize the mad crazy language that we're working with and recall that JavaScript does this:

```
-2 ? true : false; // => true0 ? true : false; // => false-1 ? true : false; // => true 😲
```

Ah! Isn't that funny? -1 has a truthiness of **true **and the only integer that has a truthiness of **false **is 0. So really, we can use tilde as a shorthand. Check this out:

```
// Instead of doing thisif(!fruits.indexOf('apples') != -1) {  // Mmm, I love apples.} else {  // We ain't got no apples}// We can do this to see if an array contains a particular value (btw, there's a better way to do this with ES6 now.if (!!~fruits.indexOf('apples') {  // Yay apples} else {  // Still no apples}
```

\
Now, the question then becomes... am I going to use this? Probably not, but it's cool to know that it exists after having stumbled upon it. I don't think I'd use this much solely because I'd prefer others to understand my code as fast as possible if they have to read it.

I hope you learned something here and won't get alienated next time you see a ~ floating around.

\[Update: 2018/02/05] I lied. It's been a single day and I've already used ~ at least 4 times in my personal projects. Hey man, I'm sorry- it's kinda cool!
