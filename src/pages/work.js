import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import _ from 'underscore'
import Sidebar from '../components/Blog/Sidebar'
import styles from '../styles/Work.module.css'
import helpers from '../helpers'
import { WorkItem } from '../components/Work'


export default class Work extends React.Component {
  render() {
    const data = this.props.data.work;
    const { edges } = data;
    const work = edges.map((edge) => Object.assign({}, edge.node.fields, edge.node.frontmatter));
    
    return (
      <section className={'scene_element--fadein'}>
        <h1>Dev Work</h1>
        <p>This is a collection of some of the most interesting projects I've created or been a part of.</p>
        {/* <p>If you're looking for my <b>music</b>, you can find that over <Link to="/music">here!</Link></p> */}
        <br></br>
        <div className={styles.container}>
          {
            work.map((workItem) => {
              return <WorkItem
                title={workItem.title}
                description={workItem.description}
                image={workItem.image}
                slug={workItem.slug}
              />
            })
          }
        </div>
      </section>
    )
  }
}

Work.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
    }),
  }),
}

export const pageQuery = graphql`
  query Work {
    work: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          templateKey: { eq: "work-page" }
        }
      }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image 
            description
            date
          }
        }
      }
    }
  }
`
