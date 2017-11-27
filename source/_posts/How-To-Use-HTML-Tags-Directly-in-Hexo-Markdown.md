---
title: How To Use HTML Tags Directly in Hexo Markdown
date: 2017-11-12 13:27:32
tags: [hexo, markdown, web development]
metaimg: "http://khalilstemmler.com/images/postheader/howtousehexohtml.PNG"
---

I've been using [Hexo](https://hexo.io/) now for about 4 months for my blog and website. I really like how simple it is to publish new content on my blog. But, because each custom page and blog post is a markdown file, I've been having to employ a bunch of different tricks to be able to write custom CSS and HTML within my blog post or page contents. 

<!-- more --> 

Sometimes you just want to be able to write some HTML or CSS; by default, each markdown line of text gets converted into a paragraph tag.

I'll tell you right away, the solution is to use Hexo's [raw tag plugin](https://hexo.io/docs/tag-plugins.html). It allows you to just insert your raw HTML and CSS into the markdown file. Uhhh, sweet?!

```html
{% raw %}
content
{% endraw %}
```

Here's an example of a markdown.md file using the raw tag.

```html
Check me out, writing some markdown right [here]("https://khalilstemmler.com").

{% raw %}
<div class="hello">
  <div>
    <h1>This is awesome.</h1>
  </div>
</div>
{% endraw %}
```

Before that, I was using things like [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it).

Holy smokes, why couldn't I have found this sooner?