import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Divider from '../components/Divider'
import BlockQuote from '../components/BlockQuote'

import styles from '../styles/WordPress.module.css'

import me from '../img/me.jpg'

import design from '../img/design.png'
import development from '../img/development.png'
import email from '../img/email.png'

const Me = () => {
  return (
    <div className={styles.meContainer}>
      <img src={me}></img>
    </div>
  )
}

export default class WordPress extends React.Component {

  scrollToTop () {

  }

  render() {
    return (
      <section className={styles.overrideContainer}>
        <Me/>
        <h1 className={styles.landingTitle}>I help businesses take their online presence to the next level with WordPress.</h1>
        
        <div className={styles.imageContainer}>
          <img className={styles.image} src={design}/>
        </div>

        <h2>Theme Design</h2>
        <p>Need a WordPress website to power your business online?</p>
        <p>I can get you started with a custom theme that suits your needs and effectively tells your brand's authentic story.</p>

        <div className={styles.imageContainer}>
          <img className={styles.image} src={development}/>
        </div>

        <h2>Development / Customization</h2>
        <p>Got custom business requirements?</p>
        <p>I'll find the right plugins or <b>develop one</b> for you.</p>

        <div className={styles.imageContainer}>
          <img className={styles.image} src={email}/>
        </div>

        <h2>Email Automation</h2>
        <p>Are you utilizing probably the best (and simplest) way to convert more leads?</p>

        <BlockQuote 
          text={'Sending emails is one of the best channels for growth. You can typically see 10% to 20% additional revenue by having an email automation in place.'}
          author={'Kurt Elster'}
          authorCompany={'Ethercycle'}
          authorCompanySite={'https://ethercycle.com'}
        />
        <p>I'll help you put together a strategy to send emails automatically based on 
customer behaviour, ensuring that each customer gets the right message at
the right time.</p>

        <Divider/>

        <p>Interested in working together? <Link to="/contact">Let's chat</Link>.</p>

        <h2 style={{marginTop:'3em'}}>Have a different type of project in mind?</h2> 
        
        <p>Check out some <Link to="/technologies">other tricks</Link> this guy can do for your business.</p>

      </section>
    )
  }
}

WordPress.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
