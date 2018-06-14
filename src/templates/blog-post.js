import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import ReactDisqusComments from 'react-disqus-comments';

import styles from '../styles/Blog.module.css'

function getUniquePageIdentifier () {
  return typeof window !== 'undefined' && window.location.href
      ? typeof window !== 'undefined' && window.location.href
      : 'https://khalilstemmler.com'
}

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  date,
  image,
  category
}) => {
  const PostContent = contentComponent || Content

  console.log(category)

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div style= {{ margin: '0 auto'}} className="column is-8">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            
            <h4 className={styles.date}>{date} — in <Link className={styles.category} to={`/blog/categories/${kebabCase(category)}/`}>{category}</Link></h4>

            <div>
              <img src={image}/>
            </div>

            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/blog/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <ReactDisqusComments
              shortname="khalilstemmler-com"
              identifier={ getUniquePageIdentifier() }
              title={title}
              url={ getUniquePageIdentifier() }
              />
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      image={post.frontmatter.image}
      category={post.frontmatter.category}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image
        category
      }
    }
  }
`
