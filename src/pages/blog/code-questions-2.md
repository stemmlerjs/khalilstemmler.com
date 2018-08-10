---
templateKey: blog-post
title: Cleaner Code with Async / Await Tutorial 
date: '2018-07-30T00:05:26-04:00'
description: >-
  Asynchronous programming in JavaScript used to be difficult to write clean code
  with. Today we have options. You can write asynchronous code with callbacks
  (and face the scary rightward slant of callback hell), use Promises, or use
  async / await. I'll show you why I mostly use a combination of async / await and
  Promises to write cleaner asynchronous code. 
tags:
  - JavaScript
  - ES6
category: Web Development
image: /img/clean-code.png
published: false
---

For this question, we're supposed to get the longest sequence of 0's surrounded by 1's in a number.

```javascript
function solution(N) {
    // write your code in JavaScript (Node.js 8.9.4)
   let text = N.toString(2);
   console.log(text);
   let index = 0;
   let max = 0;
   
   while (index < text.length - 1) {
       console.log(text.charAt(index));
       if (text.charAt(index) == "1") {
           if (text.substring(index + 1).indexOf("1") !== -1) {
               let distance = text.substring(index + 1).indexOf("1");
               console.log("distance", distance, max);
               max = Math.max(max, distance);
               index = index + distance + 1;
           }
           else {
            index++; 
          }
       }
       else {
           index++;
       }
   }
   return max;
}

compute("1000100001");
```