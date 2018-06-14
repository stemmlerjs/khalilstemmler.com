import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Divider from '../components/Divider'
import BlockQuote from '../components/BlockQuote'

import styles from '../styles/Services.module.css'

import me from '../img/me.jpg'

import shopify from '../img/services/shopify-logo.png'
import wordpress from '../img/services/wordpress-logo.png'
import react from '../img/services/react-logo.png'
import node from '../img/services/node-logo.png'
import php from '../img/services/php-logo.svg'

const Me = () => {
  return (
    <div className={styles.meContainer}>
      <img src={me}></img>
    </div>
  )
}

export default class Services extends React.Component {
  render () {
    return (
      <section className={styles.overrideContainer}>
        <h1>Services</h1>
        
        <div className={styles.imagesContainer}>
          <img style={{ width: '50%'}} src={shopify}/>
          <img style={{ width: '50%'}} src={wordpress}/>
        </div>
        <div className={styles.imagesContainer}>
          <img style={{ width: '33%'}} src={react}/>
          <img style={{ width: '33%'}} src={node}/>
          <img style={{ width: '33%'}} src={php}/>
        </div>
        
        <BlockQuote text={`I've been a web developer / designer for over 5 years and 
have experience working with numerous technologies. I
specialize in Ecommerce development and you can count on me to help you meet your goals as it pertains to: `}/>

        <h2>Shopify Development</h2>
        <p>Shopify is the best choice for anyone who wants to start selling their products online. 
        Shopify already has a proven track record of addressing the common challenges faced by entrepreneurs and business owners. I <Link to="/shopify">help business owners</Link> with their themes, private apps and customization.</p>

        <h2>WordPress Development</h2>
        <p>WordPress is the world's most widely used CMS and it's great for a large number
of web projects. I can <Link to="/wordpress">help set up a beautiful custom WordPress theme</Link> for 
you to reach a wider audience with your business online.</p>

        <h2>NodeJS / JavaScript Development / App & Mobile App Development</h2>
        <p>JavaScript is my language of choice. I've built web apps, written countless scripts, and made hybrid
mobile apps in my professional, personal and freelance work utilizing technologies like ReactJS, jQuery, AngularJS, NodeJS, 
Express, Sequelize, Redis, ElasticSearch, AWS and more.</p>

        <h2>Web Design</h2>
        <p>Need a really nice portfolio website? Need something up and running quickly? 
I love designing and coding beautiful responsive websites. If you've got wireframes, I can take it from
there - I can also help with coming up with a design that resonates with you and
your audience base.</p>
        <i>PS: Check out these <a href={'http://brutalistwebsites.com/'}>brutalist websites</a>. These are "a reaction by a younger generation to the lightness, optimism, and frivolity of today's web design". This emerging trend is particually effective in cutting through the monotony of all the other 3x3 landing pages most businesses use to promote their services.</i>


        <h2>Something else in mind?</h2>
        <p>Let's <Link to="/contact">talk</Link>.</p>
      </section>
    )
  }
}

Services.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}
