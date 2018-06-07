import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

import styles from '../styles/Index.module.css'

const TemplateWrapper = ({ children }) => (
  <div style={{    maxWidth: '1260px', margin: '0 auto'}}>
    <Helmet 
      title="Khalil Stemmler - Web & Shopify Developer / Designer" 

      meta={[
        // Server side rendering meta data
        { property: "og:title" ,  content: "Khalil Stemmler - Web & Shopify Developer / Designer" },
        { property: "og:description" , content: "Freelance Web & Shopify Developer / Designer" },
        { property: "og:type" , content: "site" },
        { property: "og:url" , content: "khalilstemmler.com" },
        // { property: "og:image" , content: "<%= image %>" },
        // { property: "og:image:type" , content: "image/png" },
        // { property: "og:image:width" , content: "200" },
        // { property: "og:image:height" , content: "200" },

        // Google Tracking
        // { name: "google-site-verification", content: "hnc0xMxaywTkrqjaD9-r57vX4SF8YTRpQtaiORbyuzk" },

        // SEO Keywords
        { name:"keywords", content:"shopify developer, shopify developer oakville, shopify developer brantford, javascript developer, node shopify developer" }, 
        { name:"author", content:"Khalil Stemler" }
      ]}

      /**
       * Load stylesheets and fonts here.
       */

      link={[
        // { href: "https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i", rel: "stylesheet" },
        { src: 'https://cdn.jotfor.ms/static/prototype.forms.js', type: "text/javascript"},
        { src: 'https://cdn.jotfor.ms/static/jotform.forms.js?3.3.6436', type: "text/javascript"},
        { href: 'https://cdn.jotfor.ms/static/formCss.css?3.3.6436', rel: 'stylesheet', type: 'text/css'},
        { href: 'https://cdn.jotfor.ms/css/styles/nova.css?3.3.6436', rel: 'stylesheet', type: 'text/css'},

        { href: 'https://cdn.jotfor.ms/css/printForm.css?3.3.6436', rel: 'stylesheet', type: 'text/css', media: "print" },
        { href: 'https://cdn.jotfor.ms/themes/CSS/566a91c2977cdfcd478b4567.css?', rel: 'stylesheet', type: 'text/css'},
      ]}

    />
    <Navbar />
    <div className={styles.container}>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
