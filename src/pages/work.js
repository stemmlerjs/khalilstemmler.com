import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import _ from 'underscore'
import Sidebar from '../components/Blog/Sidebar'
import styles from '../styles/Work.module.css'
import helpers from '../helpers'
import WorkItem from '../components/Work/WorkItem'


export default class Work extends React.Component {
  render() {
    const data = this.props.data.work;
    const { edges } = data;
    const work = edges.map((edge) => Object.assign({}, edge.node.fields, edge.node.frontmatter));

    return (
      <section className={'scene_element--fadein '}>
        <h1>Work</h1>
        <div className={styles.container}>
          {
            work.map((workItem) => {
              return <WorkItem
                title={workItem.title}
                description={workItem.description}
                image={workItem.image}
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
      // categories: PropTypes.array,
      // posts: PropTypes.array,
      // tags: PropTypes.array,
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
