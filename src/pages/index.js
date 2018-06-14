
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Divider from '../components/Divider'
import BlockQuote from '../components/BlockQuote'
import LandingPage from '../components/LandingPage'
import CallToAction from '../components/CallToAction'
import LetsBuildIt from '../components/LetsBuildIt'

import styles from '../styles/Index.module.css'
import partner from '../img/partner-logo/shopify-partner.png'




export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <section>
        <LandingPage/>
        <LetsBuildIt/>
        <CallToAction/>
      </section>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "project-page" } }}
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
