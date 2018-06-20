
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Divider from '../components/Divider'
import BlockQuote from '../components/BlockQuote'
import LandingPage from '../components/LandingPage'
import CallToAction from '../components/CallToAction'
import DigitalResume from '../components/DigitalResume'
import FeaturedProject from '../components/FeaturedProject'
import Skills from '../components/Skills'
import SelectedProjects from '../components/SelectedProjects'
import SectionDivider from '../components/SectionDivider'
import RecentPosts from '../components/RecentPosts'

import styles from '../styles/Index.module.css'
import partner from '../img/partner-logo/shopify-partner.png'

import helpers from '../helpers'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    const recentPosts = helpers.blog.getPostsFromQuery(data.posts);
    console.log(recentPosts)

    return (
      <section className={'scene_element--fadein'}>
        <LandingPage/>
        <SectionDivider/>
        <DigitalResume/>
        <SectionDivider/>
        <SelectedProjects/>
        <SectionDivider/>
        <RecentPosts posts={recentPosts}/>
        <SectionDivider/>
        <Skills/>
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
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { 
          templateKey: { eq: "blog-post" } 
          published: { eq: true }
        }
      }
        limit: 4
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date 
              description
              tags 
              category
              image
            }
          }
        }
      }
  }
`
