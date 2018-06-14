
import React from 'react'

import styles from './styles/CallToAction.module.css'

class CallToAction  extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className={styles.container}>
      <h4>Hire Me</h4>
        <p>Are you looking for a communicative, punctual & experienced software developer / designer that <b>gets s**t done</b>?</p>
        <p>I’m a full-stack developer which means I can bring your project from concept to completion.</p>
        <a className={styles.mail} href="mailto:khalilstemmler@gmail.com">khalilstemmler@gmail.com</a>
      </div>
    )
  }
}

export default CallToAction;