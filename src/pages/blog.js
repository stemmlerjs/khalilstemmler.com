import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import _ from 'underscore'

import Sidebar from '../components/Blog/Sidebar'
import BlogResults from '../components/Blog/BlogResults'

import styles from '../styles/Blog.module.css'

function getPostsFromQuery (posts) {
  return posts.edges.map((edge) => edge.node)
  .map((node) => Object.assign(
    {}, node.frontmatter, node.fields)
  );
}

function getCategoriesFromQuery (categories) {
  return _.uniq(
    categories.edges.map((edge) => edge.node)
    .map((node) => Object.assign(
      {}, node.frontmatter
    ))
    .map((c) => c.category)
    .sort()
  )
}

function getTagsFromQuery (tags) {
  return _.uniq(tags.edges.map((edge) => edge.node)
    .map((node) => Object.assign(
      {}, node.frontmatter
    ))
    .reduce((acc, e) => acc.concat(e.tags), [])
    .sort()
  )
}

export default class Blog extends React.Component {
  render() {
    const { data } = this.props
    let { categories, posts, tags } = data;

    posts = getPostsFromQuery(posts);
    categories = getCategoriesFromQuery(categories);
    tags = getTagsFromQuery(tags);

    console.log(posts)

    return (
      <section className={styles.container}>
        <Sidebar
          posts={posts}
          tags={tags}
          categories={categories}
        />
        <BlogResults
          posts={posts}
        />
      </section>
    )
  }
}

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      categories: PropTypes.array,
      posts: PropTypes.array,
      tags: PropTypes.array
    }),
  }),
}


export const pageQuery = graphql`
  query Blog {
    categories: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" }}}
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
    
    tags: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "blog-post" }}}
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    
    posts: allMarkdownRemark(
        filter: { frontmatter: { 
          templateKey: { eq: "blog-post" } 
          published: { eq: true }
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
