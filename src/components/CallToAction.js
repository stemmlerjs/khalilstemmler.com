
import React from 'react'

import styles from './styles/CallToAction.module.css'

class CallToAction  extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className={styles.container}>
        <p>So are you looking for a professional, communicative & punctual software engineer with extensive full-stack web development skills for your next project?</p>
        <p>If you have an application you are interested in developing with web technology, I’d love to work with you on it. I’m a full-stack developer which means I can bring your project from concept to completion. I work primarily with Django and Node.js on the back-end and Ember.js on the front-end but picking up new languages or frameworks isn’t a problem.</p>
        <a className={styles.mail} href="mailto:khalilstemmler@gmail.com">khalilstemmler@gmail.com</a>
      </div>
    )
  }
}

export default CallToAction;