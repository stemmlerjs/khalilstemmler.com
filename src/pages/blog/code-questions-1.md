---
templateKey: blog-post
title: 'Code Challenges: parseInt() deep dive'
date: '2018-08-10T00:05:26-04:00'
description: >-
  This week in Code Challenges, I was asked to do a deep dive into the parseInt() function in JavaScript.
tags:
  - JavaScript
category: Code Challenges
image: /img/cc-parse-int.png
published: true
---
# Question: What does the following snippet output, and why?

```javascript
['12341234','5678901234','10','7890','123456a'].map(parseInt)
```

With this, if we ran it, we'd get:

```javascript
[12341234, NaN, 2, NaN, 27]
```

There's a lot going on here behind the scenes. 

So, right off the bat, we're using the `Array.map()` function to iterate over an array of 
string elements. For each of these elements, we're applying the `parseInt()` function to 
it.

The `parseInt()` function takes in two arguements. The first argument is the string value that
we want to parse, and the second argument is a number from 2-36 to be used as the radix/base 
(by default, it uses base 10).

While we don't actually see the arguments being passed into parseInt, what's actually happening
here is something like this:

```javascript
['12341234','5678901234','10','7890','123456a'].map((a, b) => parseInt(a, b))
```

The provided example is a syntactic sugar for this.

Since the first argument of the Array.map() function is the element and the second is
the index, what really gets passed into parseInt() are as follows...

```javascript
'12341234', 0
'5678901234', 1
'10', 2
'7890', 3
'123456a', 4
```

In the first iteration, we're asking to parse the string `'12341234'` with a base of 0.
It's likely that since 0 is falsey, the implementation of `parseInt()` assumes that
we didn't pass in a base at all. Because of this, it will by default assume that base 10 
is to be used. That's why it spits 12341234 back out.

In the second iteration, we've actually provided a value. We're trying to use base 1. 
However, this just isn't valid. It's not between 2 and 36, so it returns NaN.

The third iteration expects as we would imagine. `'10'` is binary for 2 and we're parsing it to base 2.

The fourth iteration with `"7890"` attempts to parse the int into a base 3 number but results in
a NaN because the `parseInt()` implementation cannot even parse the first digit (7). In base 3,
the symbol (7) doesn't exist, only 0-2.

For example:

```javascript
parseInt('0', 3) // => 0
parseInt('1', 3) // => 1
parseInt('2', 3) // => 2
parseInt('3', 3) // => NaN
```

In the final iteration with `"123456a"`, we attempt to parse it down to base 4. 
However, only the symbols "123" are understood in base 4.

Since `"123"` in base 4 can also mathematically be represented by (1 * 4^2) + (2 * 4^1) + (3 * 4^0).
We can see that the value is indeed 27.

```javascript
(1 * 4^2) + (2 * 4^1) + (3 * 4^0) = 27
```

That's what I got out of this question, what do you think? Leave a comment below if you have any ideas you'd like to share on this topic.


