import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet 
      title="Annick Beau | Makeup Artist" 

      meta={[
        // Server side rendering meta data
        { property: "og:title" ,  content: "Annick Beau - Makeup Artist" },
        { property: "og:description" , content: "Makeup Artist and student studying Makeup and Media for Creative Arts at Sheridan College in Oakville." },
        { property: "og:type" , content: "site" },
        { property: "og:url" , content: "annickbeau.com" },
        // { property: "og:image" , content: "<%= image %>" },
        // { property: "og:image:type" , content: "image/png" },
        // { property: "og:image:width" , content: "200" },
        // { property: "og:image:height" , content: "200" },

        // Google Tracking
        // { name: "google-site-verification", content: "hnc0xMxaywTkrqjaD9-r57vX4SF8YTRpQtaiORbyuzk" },

        // SEO Keywords
        { name:"keywords", content:"makeup artist, photography, bridal, editorial, fashion, sheridan college, oakville, makeup" }, 
        { name:"author", content:"Annick Beau" }
      ]}

      /**
       * Load stylesheets and fonts here.
       */

      link={[
        { href: "https://fonts.googleapis.com/css?family=Oswald:400,500,600,700", rel: "stylesheet" },
      ]}

      
    />
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
