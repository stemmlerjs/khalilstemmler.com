import React from 'react'
import me from '../img/me.jpg'

import Link from 'gatsby-link'
import styles from './styles/LandingPage.module.css'

import cowboy from '../img/cowboy.png'

class LandingPage extends React.Component {
  constructor() {
    super()

    this.state = {
      abilities: [
        'build your app',
        'create your website',
        'design your Shopify store',
        'sell stuff online',
        'fight aliens',
        'learn web development',
        'develop your WordPress theme',
      ],
      counter: 0,
    }

    this.interval = setInterval(() => {
      this.setState({
        ...this.state,
        counter: (this.state.counter + 1) % this.state.abilities.length,
      })
    }, 2000)
  }

  // 🤠

  componentDidMount() {
    console.log(this.interval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  scrollToAbout() {
    var element_to_scroll_to = document.getElementById('about')
    element_to_scroll_to.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={me} />
        </div>
        <div>
          <h1 className={styles.landingTitle}>
            Howdy{' '}
            <img
              className={styles.cowboy}
              style={{ display: 'inline-block' }}
              src={cowboy}
            />. I'm a full-stack developer in Toronto. I can help you{' '}
            <span className={styles.ability}>
              {this.state.abilities[this.state.counter]}
            </span>.
          </h1>
          <p>
            I create robust web applications and software, mostly using modern JavaScript tools like NodeJS and React.
          </p>

          <div className={styles.buttonContainer}>
            <button
              onClick={() => this.scrollToAbout()}
              className={styles.whatIDo}
            >
              What I do
            </button>
            <Link to="/contact">
              <button className={styles.contact}>Contact</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage
