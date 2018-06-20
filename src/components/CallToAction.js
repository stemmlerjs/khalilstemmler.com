
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
        <p>Are you looking for a communicative, punctual & experienced software developer?</p>
        <p>I can help you bring your project from concept to completion.</p>
      </div>
    )
  }
}

export default CallToAction;