---
templateKey: blog-post
title: How To Optimize Your Gatsby Blog For SEO
date: '2018-06-18T22:29:47-04:00'
description: >-
  Gatsby is a great tool for creating static websites, landing pages, and blogs.
  This post will show you how you can optimize your blog for SEO using a simple
  config.
tags:
  - JavaScript
  - SEO
  - Gatsby
category: Web Development
image: /img/web-1280-–-1.png
published: false
---
I've been using Gatsby for about a month now and after taking the time to learn it, I've really been enjoying it. So far, I've put together this blog, a landing page for a pet project, a portfolio website for a client and a blog for my business using Gatsby and I have a strong feeling that I'll be using it for a lot more projects. 

One of the important parts of building a blog is making sure that each of your blog pages are unique and indexable by search engines. The [Gatsby documentation](https://www.gatsbyjs.org/docs/seo/) points to using the [gatsby-plugin-react-helment](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet) plugin to add meta tags to your blog, but doesn't give a nice concrete example as to how you might set up a nice reusable component to do this. That's what I'm going to share with you today.

We're going to create a simple reusable component that you can use in your blog post template. 

**app/config/index.js**

```javascript
const Config = {
  twitter: 'https://twitter.com/stemmlerjs',
  url: 'https://khalilstemmler.com',
  logo: 'https://khalilstemmler.com/img/me.jpg',
  title: 'Khalil Stemmler - Software Developer / Designer'
}

export default Config
```

**app/components/SEO.js**

```javascript
import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import * as config from '../config';

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'https://khalilstemmler.com',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: config.title,
    },
  ];

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'https://khalilstemmler.com',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'https://khalilstemmler.com',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: config.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
          author: {
            '@type': 'Person',
            name: 'Khalil Stemmler',
          },
          publisher: {
            '@type': 'Organization',
            url: 'https://khalilstemmler.com',
            logo: config.logo,
            name: 'Khalil Stemmler',
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': config.url,
          },
          datePublished,
        },
      ]
    : schemaOrgJSONLD;
};

const SEO = ({ postData, postImage, isBlogPost }) => {
  const postMeta = postData || {};

  const title = postMeta.title || config.title;
  const description =
    postMeta.description || postData.excerpt || config.description;
  const image = `${config.url}${postImage}` || config.image;
  const slug = postMeta.slug;
  const url = postMeta.slug
    ? `${config.url}${postMeta.slug}`
    : config.url;
  const datePublished = isBlogPost ? postMeta.date : false;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
  });
  
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }).isRequired,
  postImage: PropTypes.string,
};

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
};

export default SEO;
```

**app/templates/blog-post.js**

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import ReactDisqusComments from 'react-disqus-comments';
import SEO from '../components/SEO';

import helpers from '../helpers'

import styles from '../styles/Blog.module.css'

function getUniquePageIdentifier () {
  return typeof window !== 'undefined' && window.location.href
      ? typeof window !== 'undefined' && window.location.href
      : 'https://khalilstemmler.com'
}

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  image,
  category
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      {helmet || ''}
      <div>
        <div>
          <div style= {{ margin: '0 auto'}} className="column is-10">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            
            <h4 className={styles.date}>in <Link className={styles.category} to={`/blog/categories/${kebabCase(category)}/`}>{category}</Link></h4>

            <div>
              <img src={image}/>
            </div>

            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <ReactDisqusComments
              shortname="khalilstemmler-com"
              identifier={ getUniquePageIdentifier() }
              title={title}
              url={ getUniquePageIdentifier() }
              />
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  let { markdownRemark: post } = data;

  post = Object.assign({}, post, post.fields, post.frontmatter)

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.description}
      helmet={
        <SEO 
          isBlogPost={true}
          postData={post}
          postImage={post.image}
        />}
      tags={post.tags}
      title={post.title}
      date={post.date}
      image={post.image}
      category={post.category}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
        category
      }
    }
  }
`
```

If your site is uploaded, you can use a tool like Facebook URL debugger to test out your SEO. 

I hope this was useful to you. 

Resources: 

Jason Lengstorf's personal site - <https://github.com/jlengstorf/lengstorf.com>

This blog -\
<https://github.com/stemmlerjs/khalilstemmler.com>
