import React from 'react'

import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

import styles from './styles/Sidebar.module.css'

const TotalPosts = ({ count }) => {
  return (
    <div className={`${styles.standard} ${styles.section}`}>
      <Link to="/blog">All {` ${count} `} posts</Link>
    </div>
  )
}

const Tags = ({ tags, currentTag }) => {
  return (
    <div className={`${styles.tags} ${styles.sectionLarge}`}>
      <h4 className={styles.header}>Tags</h4>
      {tags.map((tag, index) => {
        return (
          <Link
            to={`/blog/tags/${kebabCase(tag)}`}
            className={currentTag == tag ? styles.selected : ''}
            key={index}
          >
            {tag}
          </Link>
        )
      })}
    </div>
  )
}

const Categories = ({ categories, currentCategory }) => {
  return (
    <div className={`${styles.tags} ${styles.sectionLarge}`}>
      <h4 className={styles.header}>Category</h4>
      {categories.map((category, index) => {
        return (
          <Link
            to={`/blog/categories/${kebabCase(category)}`}
            className={currentCategory == category ? styles.selected : ''}
            key={index}
          >
            {category}
          </Link>
        )
      })}
    </div>
  )
}

const Sidebar = ({ posts, tags, categories, currentTag, currentCategory }) => {
  return (
    <div className={styles.container}>
      <TotalPosts count={posts.length} />
      <Tags currentTag={currentTag} tags={tags} />
      <Categories currentCategory={currentCategory} categories={categories} />
    </div>
  )
}

export default Sidebar
