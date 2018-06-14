import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import _ from 'underscore'

import Sidebar from '../components/Blog/Sidebar'
import BlogResults from '../components/Blog/BlogResults'

import styles from '../styles/Blog.module.css'

import helpers from '../helpers'

export default class Blog extends React.Component {
  render() {
    const { data } = this.props
    let { categories, posts, tags } = data;

    posts = helpers.blog.getPostsFromQuery(posts);
    categories = helpers.blog.getCategoriesFromQuery(categories);
    tags = helpers.blog.etTagsFromQuery(tags);

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
