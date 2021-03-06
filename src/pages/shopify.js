import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Divider from '../components/Divider'
import BlockQuote from '../components/BlockQuote'

import styles from '../styles/Index.module.css'

import me from '../img/me.jpg'
import partner from '../img/partner-logo/shopify-partner.png'

const Me = () => {
  return (
    <div className={styles.meContainer}>
      <img src={me} />
    </div>
  )
}

export default class ShopifyPage extends React.Component {
  scrollToTop() {}

  render() {
    const { data } = this.props
    // const { edges: posts } = data.allMarkdownRemark
    console.log(data)

    return (
      <section className={'scene_element--fadein '}>
        <Me />
        <h1 className={styles.landingTitle}>
          I'm a web developer / designer & Shopify Partner helping businesses
          succeed in Ecommerce.
        </h1>

        <img src={partner} />

        <h2>Theme Development</h2>
        <p>
          Want to customize the look and feel of your online store? Want
          specific functionality?
        </p>
        <p>I'll work with you to get exactly what you're looking for.</p>

        <h2>Application Development</h2>
        <p>
          Need a custom app to improve your business? Have a good idea for the
          Shopify App store?
        </p>
        <p>I'll help you design and build it.</p>

        <h2>Migrations / Store Setup</h2>
        <p>
          Coming from another ecommerce platform? Setting up your store for the
          first time?
        </p>

        <BlockQuote
          text={
            'Knowing how to set up a theme for optimum conversion rate is something that most store owners simply don’t have experience to do.'
          }
          author={'Kurt Elster'}
          authorCompany={'Ethercycle'}
          authorCompanySite={'https://ethercycle.com'}
        />
        <p>
          I'll plan and execute a migration and help you get your store setup
          for good conversion rates.
        </p>

        <h2>Integrations</h2>
        <p>
          Is there software that you absolutely need to integrate with Shopify?
        </p>
        <p>I'll hook it up.</p>

        <Divider />

        <p>
          Interested in working together? <Link to="/contact">Let's chat</Link>.
        </p>

        <h2>Have a different type of project in mind?</h2>

        <p>
          Check out some <Link to="/services">other tricks</Link> this guy can
          do for your business.
        </p>
      </section>
    )
  }
}

ShopifyPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query ShopifyPage {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
          }
        }
      }
    }
  }
`
