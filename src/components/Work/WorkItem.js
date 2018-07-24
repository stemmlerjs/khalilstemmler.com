import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/WorkItem.module.css'

const WorkItem = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={props.image}/>
      </div>
      <div className={styles.textContainer}>
        <div>{props.title}</div>
        <div>{props.description}</div>
      </div>
    </div>
  )
}

WorkItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default WorkItem;