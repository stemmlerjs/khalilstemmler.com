import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import BlogResults from '../components/Blog/BlogResults'
import Sidebar from '../components/Blog/Sidebar'

import helpers from '../helpers'

import styles from '../styles/Blog.module.css'

class TagRoute extends React.Component {
  render() {
    let posts = this.props.data.posts;
    let categories = this.props.data.categories;
    let tags = this.props.data.tags;

    posts = helpers.blog.getPostsFromQuery(posts);
    categories = helpers.blog.getCategoriesFromQuery(categories);
    tags = helpers.blog.getTagsFromQuery(tags);
    

    const tag = this.props.pathContext.tag
    const title = this.props.data.site.siteMetadata.title

    return (
      <section className={styles.container}>
        <Helmet title={`${tag} | ${title}`} />
        <Sidebar
          posts={posts}
          tags={tags}
          categories={categories}
          currentTag={tag}
        />
        <BlogResults
          posts={posts}
        />

      </section>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }

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
      limit: 1000
      filter: { frontmatter: { 
        tags: { 
          in: [$tag] 
        } 
        templateKey: { eq: "blog-post" } 
        published: { eq: true }
      } 
    }) 

    {
    totalCount
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