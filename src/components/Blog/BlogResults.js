import React from 'react'

import moment from 'moment'
import kebabCase from "lodash/kebabCase";

import Link from 'gatsby-link'

import styles from './styles/BlogResults.module.css'

const BlogFeatureImage = ({ image, slug }) => {
  return (
    <div className={styles.featureImage}>
      <Link to={slug}>
        <img src={image}/>
      </Link>
    </div>
  )
}

const TagsAndCategories = ({ tags, category }) => {
  return (
    <div className={styles.tagsAndCategoriesContainer}>
      <Link to={`/blog/categories/${kebabCase(category)}`}>{category}</Link>
      {
        tags.length !== 0
          ? <span>{` - `}
            {
              tags.map((tag, index) => {

                if ((tags.length !== 1) && (index == tags.length - 1)) {
                  return <span key={index}>{`, `}<Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link></span>
                }

                return <Link to={`/blog/tags/${kebabCase(tag)}`} key={index}>{tag}</Link>
              })
            }  
          </span>
          : ''
      }
    </div>
  )
}

const BlogPost = ({ post }) => {
  return (
    <div>
      {/*<div className={styles.date}>{moment(new Date(post.date)).format('MMMM Do YYYY')}</div>*/}
      <div className={styles.title}><Link to={post.slug}>{post.title}</Link></div>
      <div className={styles.description}>{post.description}</div>
      <TagsAndCategories
        category={post.category}
        tags={post.tags}
      />
      <BlogFeatureImage
        image={post.image}
        slug={post.slug}
      />
    </div>
  )
}

const BlogResults = ({ posts }) => {
  return (
    <div className={styles.container}>
      {
        posts.map((post, index) => {
          return <BlogPost key={index} post={post}/>
        })
      }
    </div>
  )
}

export default BlogResults;