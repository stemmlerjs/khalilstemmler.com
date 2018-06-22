import React from 'react'

import Link from 'gatsby-link'

import styles from './styles/RecentPosts.module.css'

const RecentPosts = ({ posts }) => {
  return (
    <section>
      <h4>Recent Posts</h4>

      {posts.map((post, index) => {
        return (
          <Link
            to={post.slug}
            style={{ textDecoration: 'none' }}
            className={styles.postContainer}
            key={index}
          >
            <div className={styles.postContainerInner}>
              <div className={styles.imageContainer}>
                <img src={post.image} />
              </div>
              <div className={styles.title}>{post.title}</div>
              <div className={styles.body}>{post.description}</div>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export default RecentPosts
