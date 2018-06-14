

import React from 'react'
import me from '../img/me.jpg'

import Link from 'gatsby-link'
import styles from './styles/LandingPage.module.css'

class LandingPage extends React.Component {
  constructor () {
    super();

    this.state = {
      abilities: ['build your app', 'create your website', 'design your Shopify store', 'sell stuff online', 'fight aliens', 'design your WordPress theme'],
      counter: 0
    }

    this.interval = setInterval(() => {
      this.setState({
        ...this.state,
        counter: (this.state.counter + 1) % this.state.abilities.length
      })
    }, 2000);
  }

  componentDidMount () {
    console.log(this.interval)
  }

  render () {
    return (
      <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={me}/>
          </div>
          <div>
            <h1 className={styles.landingTitle}>
              Howdy 🤠 I'm a software developer in Toronto. I can help you <span className={styles.ability}>
              {this.state.abilities[this.state.counter]}
              </span>.
            </h1>
            <p>I design, build & maintain cool stuff on the web.</p>

            <p>I like to code, be creative, and solve problems.</p>

            <p>Let's chat <a className={styles.mail} href="mailto:khalilstemmler@gmail.com">khalilstemmler@gmail.com</a></p>

            <div className={styles.buttonContainer}>
              <Link to="/services"><button className={styles.whatIDo}>What I do</button></Link>
              <Link to="/contact"><button className={styles.contact}>Contact</button></Link>
            </div>
          </div>
      </div>
    )
  }
}

export default LandingPage;