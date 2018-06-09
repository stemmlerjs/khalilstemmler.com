
import React from 'react'

import styles from './styles/Footer.module.css'

import khalil from '../img/partner-logo/khalil-logo.png'
import partnerLogo from '../img/partner-logo/partner-logo-black.jpg'

import twitter from '../img/twitter-logo.png'
import linkedIn from '../img/linkedin-logo.png'
import instagram from '../img/instagram-logo.png'

import Link from 'gatsby-link'

const MailChimpSignup = () => (
<div id="mc_embed_signup">
<form action="https://khalilstemmler.us17.list-manage.com/subscribe/post?u=6816d2889bed041b6e83840af&amp;id=44ae72b287" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
    <div id="mc_embed_signup_scroll">
	  <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="email address" required/>
    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
      <input type="text" name="b_6816d2889bed041b6e83840af_44ae72b287" tabIndex="-1"/></div>
    <div>
      <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"/></div>
    </div>
</form>
</div>
)
const Footer = (props) => {
  return (
    <div className={styles.container}>

      <div className={styles.topFooter}>
        <div className={styles.mailListCopy}>Learn how to optimize and grow your online store on Shopify with weekly content.</div>
        <div className={styles.mailchimpContainer}>
          <MailChimpSignup/>
        </div>
        
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.bottomFooterFlex}>
          <h3>519.429.9674</h3>
          <h3><Link to="/work-with-me">Start a project</Link></h3>
          <h3><Link to="/projects">Work</Link></h3>
        </div>
        <div className={styles.bottomFooterFlex}>
          <h3><Link to="/about">About</Link></h3>
          <h3><Link to="/blog">Blog</Link></h3>
          <h3><Link to="/contact">Contact</Link></h3>
        </div>

        <div className={styles.footerSocialContainer}>
          <a href={'https://twitter.com/stemmlerjs'}><img src={twitter}/></a>
          <a href={'https://twitter.com/stemmlerjs'}><img src={linkedIn}/></a>
          <a href={'https://twitter.com/stemmlerjs'}><img src={instagram}/></a>
        </div>
      </div>

      <div className={styles.logosContainer}>
        <img src={khalil}/>
        <img src={partnerLogo}/>
        <div className={styles.signature}>
          Made with ❤️ by Khalil Stemmler in 2018
        </div>
      </div>
    </div>
  )
}

export default Footer