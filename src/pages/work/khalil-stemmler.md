---
title: Khalil Stemmler Portfolio
date: 2018-06-10 22:33:14
templateKey: work-page
description: Portfolio and developer blog.
demoUrl: 'https://khalilstemmler.com'
repoUrl: 'https://github.com/stemmlerjs/khalilstemmler.com'
public: true
image: /img/khalil-blog-small.png
---

The portfolio/blog that you're currently on. Its initial purpose was to serve as a landing page to land new freelance clients based on tips from [Julian Shapiro](https://www.julian.com/guide/growth/landing-pages), but has since then been repurposed into a developer portfolio / blog.

## Design process

Like all of my web projects, I first designed the site with __Adobe XD__ for desktop and mobile using a *mobile-first* methodology.

![process](/img/khalil-blog-process-1.png).

I was initially going to code out the site using HTML, SASS and maybe some simple JavaScript, but then I discovered GatsbyJS... and suddenly, my life changed.

## Development process

The site was relatively simply to code up, it was done in about 2 days (one of those days was just learning GatsbyJS).

### Using GatsbyJS
Using Gatsby was a delightful experience. It's a relatively new static site generator that's gaining a lot of popularity. Gatsby allows you to create your site with ReactJS and GraphQL. It follows a lot of the same template methodology that other static site generators follow. So, if you've done something like this before (I used to use Hugo and before that, Hexo), it should feel familiar.

### The blog
Building the blog was the most challenging / fun part of the entire project, mostly because I wasn't familiar with GraphQL before hand, and I needed to learn it in order to implement `categories` and `tags` within my blog.

![process](/img/khalil-blog-process-3.png).

I'll write a blog post on how I accomplished this, a little bit later.

### What about SEO?
I actually DID write a blog post on this topic. Check it out [here](/blog/how-to-optimize-your-gatsby-blog-for-seo).

### Deployment?

It's deployed on Netlify. Check [this out](https://github.com/stemmlerjs/gatsby-starter-netlify-cms). EZ.

### CMS?

Yep. It's CMS enabled. There's a file called `/static/admin/config.yml` that defines all of the relationships between the models and their widgets. 

If you need a starter Gatsby blog/CMS on Netlify, you can clone the [repo I used](https://github.com/stemmlerjs/gatsby-starter-netlify-cms). If you want to learn to hook up tags, categories, etc, you can take a peek at my [repo](https://github.com/stemmlerjs/khalilstemmler.com).