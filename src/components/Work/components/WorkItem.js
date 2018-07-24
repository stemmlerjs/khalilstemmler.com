import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/WorkItem.module.css'

const WorkItem = (props) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={props.slug} className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={props.image}/>
      </div>
      <div className={styles.textContainer}>
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </Link>
  )
}

WorkItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

export default WorkItem;