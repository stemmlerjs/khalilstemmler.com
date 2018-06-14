import React from 'react'

import moment from 'moment'
import kebabCase from "lodash/kebabCase";

import Link from 'gatsby-link'

import styles from './styles/BlogResults.module.css'

const BlogFeatureImage = ({ image }) => {
  return (
    <div className={styles.featureImage}>
      <img src={image}/>
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
                  return <span>{`, `}<Link to={`/blog/tags/${kebabCase(tag)}`} key={index}>{tag}</Link></span>
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
      <div className={styles.date}>{moment(new Date(post.date)).format('MMMM Do YYYY')}</div>
      <div className={styles.title}><Link to={post.slug}>{post.title}</Link></div>
      <div className={styles.description}>{post.description}</div>
      <TagsAndCategories
        category={post.category}
        tags={post.tags}
      />
      <BlogFeatureImage
        image={post.image}
      />
    </div>
  )
}

const BlogResults = ({ posts }) => {
  console.log(posts, "asd")
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