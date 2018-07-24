import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/WorkPage.module.css'
import { redirectTo } from '../../../utils/utils'


const DemoAndRepo = ({demo, repo}) => {
  return (
    <div className={styles.demoAndRepoContainer}>
      { !!demo ? <div onClick={() => redirectTo(demo)} className={styles.content}>Demo</div> : ''}
      { !!repo ? <div onClick={() => redirectTo(repo)} className={styles.content}>Repo</div> : ''}
    </div>
  )
}

export default DemoAndRepo;