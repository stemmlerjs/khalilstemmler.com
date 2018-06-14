import React from 'react'

import styles from './styles/Skills.module.css'

const Skills = (props) => {
  return (
    <div className={styles.outer}>
      <h4>Skills</h4>

      <div className={styles.flexContainer}>
        <div className={styles.leftContainer}>I understand the challenges of working remotely. Here are a couple things I'm good at.</div>
        <div>
          <h3 className={styles.elementHeader}>Communication</h3>
          <p>I realize the importance of good communication. I use tools like Slack to make sure we're on the same page.</p>
          <h3 className={styles.elementHeader}>Organisation</h3>
          <p>I believe it’s important to stay organised while working remotely. I use Asana to plan out project deliverables.</p>
          <h3 className={styles.elementHeader}>Project Management</h3>
          <p>I believe it's important to break a large project into discrete pieces and schedule based on those.</p>
          <h3 className={styles.elementHeader}>Delivering</h3>
          <p>I always deliver. I always get the job done, and get it done right.</p>
        </div>
      </div>
    </div>
  )
}

export default Skills;