import React from 'react'

import styles from './styles/FeaturedProject.module.css'

import univjobs from '../img/projects/univjobs.png'

const FeaturedProject = (props) => {
  return (
    <div className={styles.outer}>
      <h4>Featured Project</h4>

      <div className={styles.container}>
        <div>
          <img src={univjobs}/>
          <a href={"https://univjobs.ca"}><div className={styles.mask}></div></a>
        </div>
      </div>

      <div className={styles.projectTitle}>Univjobs</div>
      <h4>A full-stack job board & student recruitment app</h4>
    </div>
  )
}

export default FeaturedProject