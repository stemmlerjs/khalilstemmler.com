
import React from 'react'

import styles from './styles/Footer.module.css'

import khalil from '../img/partner-logo/khalil-logo.png'
import partnerLogo from '../img/partner-logo/partner-logo-black.jpg'

import twitter from '../img/twitter-logo.png'
import linkedIn from '../img/linkedin-logo.png'
import instagram from '../img/instagram-logo.png'

import Link from 'gatsby-link'

import newStyles from './styles/NewFooter.module.css'

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

const TopFooter = (props) => {
  return (
    <div className={styles.topFooter}>
      <div className={styles.mailListCopy}>Learn how to optimize and grow your online store on Shopify with weekly content.</div>
      <div className={styles.mailchimpContainer}>
        <MailChimpSignup/>
      </div>
      
    </div>
  )
}

const Footer = (props) => {
  return (
    <div className={styles.container}>
      {
        true == false 
        ? <TopFooter/>
        : ''
      }
      

      <div className={styles.bottomFooter}>
        <div className={styles.bottomFooterFlex}>
          <h3>519.429.9674</h3>
          <h3><Link to="/contact">Start a project</Link></h3>
          <h3><Link to="/projects">Work</Link></h3>
        </div>
        <div className={styles.bottomFooterFlex}>
          <h3><Link to="/about">About</Link></h3>
          <h3><Link to="/blog">Blog</Link></h3>
          <h3><Link to="/contact">Contact</Link></h3>
        </div>

        <div className={styles.footerSocialContainer}>
          <a href={'https://twitter.com/stemmlerjs'}><img src={twitter}/></a>
          <a href={'https://www.linkedin.com/in/khalilstemmler/'}><img src={linkedIn}/></a>
          <a href={'https://instagram.com/stemmlerjs'}><img src={instagram}/></a>
          <a href={'https://github.com/stemmlerjs'}>
            <svg style={{
                  maxWidth: '26px',
                  position: 'relative',
                  top: '-4px'
            }} height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
              <path style={{fill:'white', }} fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
            </path></svg>
          </a>
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

const FooterHeader = () => {
  return (
    <div className={newStyles.footerHeaderContainer}>
      <h3>Khalil Stemmler</h3>
      <a href="mailto:khalilstemmler@gmail.com">khalilstemmler@gmail.com</a>
      <p>519.429.9674</p>
      <p>I'm a Canadian software developer. I can help you build your next project.</p>
    </div>
  )
}

const MenuList = (props) => {
  return (
    <div className={newStyles.menuList}>
      <div className={newStyles.menuListTitle}>{props.title}</div>
      {
        props.items.map((item, index) => {
          if (item.email) {
            return <a href="mailto:khalilstemmler@gmail.com">{item.name}</a>
          }

          else if (item.external) {
            return <a href={item.url}>{item.name}</a>
          }
          
          else 
            return <Link style={{ textDecoration: 'none'}} to={item.url} key={index}>{item.name}</Link>
        })
      }
    </div>
  )
}

const Menu = () => {
  return (
    <div className={newStyles.menuContainer}>
      <MenuList title={'Menu'} items={[
        { name: 'About', url: '/about' },
        { name: 'Blog', url: '/blog' },
        { name: 'Services', url: 'services' }
      ]}/>
      <MenuList title={'Contact'} items={[
        { name: 'Inquiry', url: '/contact' },
        { name: 'khalilstemmler@gmail.com', url: 'khalilstemmler@gmail.com', email: true },
        { name: '@stemmlerjs', url: 'https://twitter.com/stemmlerjs', external: true }
      ]}/>

      <MenuList title={'Social'} items={[
        { name: 'GitHub', url: 'https://github.com/stemmlerjs', external: true },
        { name: 'Twitter', url: 'https://twitter.com/stemmlerjs', external: true },
        { name: 'Instagram', url: 'https://instagram.com/stemmlerjs', external: true },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/khalilstemmler/', external: true }
      ]}/>
    </div>
  )
}

const NewFooter = (props) => {
  return (
    <div className={newStyles.container}>
      <FooterHeader/>
      <Menu/>
    </div>
  )
}

export default NewFooter