
import React from 'react'

import Link from 'gatsby-link'
import kebabCase from "lodash/kebabCase";

import styles from './styles/Sidebar.module.css'

const TotalPosts = ({ count }) => {
  return (
    <div className={`${styles.standard} ${styles.section}`}>
      <Link to="/blog">All {` ${count} `} posts</Link>
    </div>
  )
}

const Tags = ({ tags }) => {
  return (
    <div className={`${styles.tags} ${styles.sectionLarge}`}>
      <h4 className={styles.header}>Tags</h4>
      {
        tags.map((tag, index) => {
          return <Link to={`/blog/tags/${kebabCase(tag)}`} key={index}>{tag}</Link>
        })
      }
    </div>
  )
}

const Categories = ({ categories }) => {
  return (
    <div className={`${styles.tags} ${styles.sectionLarge}`}>
      <h4 className={styles.header}>Category</h4>
      {
        categories.map((category, index) => {
          return <Link to={`/blog/categories/${kebabCase(category)}`} key={index}>{category}</Link>
        })
      }
    </div>
  )
}

const Sidebar = ({ posts, tags, categories }) => {
  return (
    <div className={styles.container}>
      <TotalPosts count={posts.length}/>
      <Tags tags={tags}/>
      <Categories categories={categories}/>
    </div>
  )
}

export default Sidebar