import React from 'react'

import styles from './styles/LetsBuildIt.module.css'

import emojiis from '../img/emojiis.png'

const Pillar = props => {
  return (
    <div className={styles.pillar}>
      <h3>{props.title}</h3>
      <div>{props.text}</div>
    </div>
  )
}

const LetsBuildIt = props => {
  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          <img src={emojiis} />
        </div>
        <div className={styles.heroTextContainer}>
          <h3>Let's build your beautiful website.</h3>
          <div>
            Building software on the web is my passion. Here's what I'm good at:
          </div>
        </div>
      </div>

      <div className={styles.pillarsContainer}>
        <Pillar
          title={'App Development'}
          text={`I create web
          sites, fully-fledged web apps, sites, and stores
          with NodeJS, React,
          Shopify and WordPress.`}
        />
        <Pillar
          title={'Web Design'}
          text={`I design websites that
            are functional, easy
            on the eyes, tell your story, and 
            act as a your best
            sales tool.`}
        />
        <Pillar
          title={'Ecommerce Development'}
          text={`I design web sites 
            that convert visitors
            into paying customers, 
            and write scripts to 
            automate common 
            tasks.`}
        />
      </div>
    </div>
  )
}

export default LetsBuildIt
