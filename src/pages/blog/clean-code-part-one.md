---
templateKey: blog-post
title: Clean Code Series - About clean code
date: '2019-01-24T00:05:26-04:00'
description: >-
  There are a few books that all programmers should read.
  Clean Code by Robert C. Martin (Uncle Bob) is one of those. Here are some of the key takeaways that I'm collecting from my first read through.
tags: 
  - Professionalism
  - Books
category: Software Development
image: /img/clean-grid.jpeg
published: true
---

I'm a solemn believer that reading books is one of the greatest return on investment activites that you can do. And in my journey to become a better developer every day, I've started reading Clean Code by Robert C. Martin (Uncle Bob).

## Why clean code matters

Writing clean code is one of the most important parts of being a professional in this industry. As a developer, you probably spend about 90% of your time reading code and 10% of your time actually writing code. The amount of time you spend planning and thinking is directly proportional to the quality of the code that ambulates out of your hands into the editor. Funny, given that it's often more important to our superiors to just deliver, rather than to implement solutions with well-designed architectures and readability.

Some developers might be unlucky to work in industries where developers and consultants are treated as 

Often times, we're forced to write things fast, just meet deadlines and churn out code. Sometimes we power through it. "Run this line of code in some method that you're trying to *just make work*... didn't work, change it a little bit and try something else... compile it... step back and take a look, see what happens... looks like it worked."

```
git add .
git commit -m "Fixed the thing and made it work. Done."
git push -f origin master
```

*Please don't*

The first chapter has a panel of respected computer scientists, researchers and professional programmers describing what clean code means to them. Michael Feathers, who wrote *Working Effectively with Legacy Code*, has a quote where among other things, he says that when you read the code that "someone left for you", you sit "in appreciation" of the fact that that it was written by "someone who cares deeply about the craft".

You know when you're looking at this type of code.

There are some more pragmatic opinions from Ron Jeffries and Dave Thomas where they both say that clean code has unit tests, a lack of duplication in addition to explicit and minimal APIs.

---

## Boy Scout Rule

This is great. I wasn't aware of The Boy Scout Rule until I started consulting for a project at work which was to build on top of an existing system. The lead engineer handing off the codebase to me said, "take this code and apply the Boy Scout's Rule".

The Boy Scout rule means you should:

> Leave the campground cleaner than you found it.

Codebases typically degrade in quality over time if they don't get the proper TLC that they deserve. If we just took 5-10 minutes everytime we touched the codebase to leave it a little bit better than we found it, then the codebase would actually get better over time.

## Messes cost money

When we leave a mess, we're signaling to other developers that it's also OK to leave a mess. Also, when we leave a mess, we may actually end up **forcing** other developers to worsen that mess since they might not know how to clean up the incumbent code.

There's a lot of talk about going fast, and being agile. There's talk about building MVPs and *just making it work* (which I think has it's use cases). But sometimes, when we *go fast, but don't necessarily go well*, those MVPs need to get rebuilt... and rebuilding things costs time which is money (simple math). 

If the budget allows it, then that's great. Companies like Google actually [rebuild all of their software every 2 years](https://arxiv.org/ftp/arxiv/papers/1702/1702.01715.pdf). That can have a profound impact on the quality of the software they produce. Imagine getting a second shot at Google Maps. What about a third shot? That's great... but..

> Time, quality, cost. You can only have two.

A lot of the time- especially for startups with such limited resources, quality gets the sh*tty end of the stick.

If we don't address the messes early on, release cycles get longer and longer- which costs more money in addition to more time. It can get so bad that you have not a single quality from the time + quality + cost matrix. It's at this point that companies fail.

That's one of the key takeaways I'm getting. It's about being a professional, taking responsibility for your code, telling your stakeholders when it's time to focus on refactoring and cleanup, and pushing back on that. Uncle Bob actually points out that developers are in fact- stakeholders. 

Developers who care deeply about the quality and cleanliness of the code can make companies lots of money.

Developers who take shortcuts and don't come back to clean up messes and bring a company to it's knees.

--- 

**[Read the book](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM), I'm really enjoying it so far. Citations are taken directly from the text.**