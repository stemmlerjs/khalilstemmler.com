import React from 'react'

import styles from './styles/Skills.module.css'

import picOfMe from '../img/picofme.png'

const Skills = (props) => {
  return (
    <div className={styles.outer}>
      <h4>Skills</h4>

      <div className={styles.flexContainer}>
        <div className={styles.leftContainer}>
          I understand the challenges of working remotely. Here are a couple things I'm good at.

          <div className={styles.imageContainer}>
            <img src={picOfMe}/>
          </div>
        </div>
        <div>
          <h3 className={styles.elementHeader}>Communication</h3>
          <p>Communication is absolutely paramount dealing with any team or client. I take the time to fully understand your needs and keep you updated on how the project is evolving.</p>
          <h3 className={styles.elementHeader}>Organisation</h3>
          <p>I believe it’s important to stay organised while working remotely. I use Asana and GitLab to plan out project deliverables.</p>
          <h3 className={styles.elementHeader}>Project Management</h3>
          <p>I believe it's important to break a large project into discrete pieces and schedule based on those.</p>
        </div>
      </div>
    </div>
  )
}

export default Skills;