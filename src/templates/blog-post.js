import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import ReactDisqusComments from 'react-disqus-comments';
import SEO from '../components/SEO';

import helpers from '../helpers'

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

  return (
    <section>
      {helmet || ''}
      <div>
        <div>
          <div style= {{ margin: '0 auto'}} className="column is-10">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            
            <h4 className={styles.date}>in <Link className={styles.category} to={`/blog/categories/${kebabCase(category)}/`}>{category}</Link></h4>

            <div>
              <img src={image}/>
            </div>

            <p>{description}</p>
            <PostContent className={'blog-post-content'} content={content} />
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
  let { markdownRemark: post } = data;

  post = Object.assign({}, post, post.fields, post.frontmatter)

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.description}
      helmet={
        <SEO 
          isBlogPost={true}
          postData={post}
          postImage={post.image}
        />}
      tags={post.tags}
      title={post.title}
      date={post.date}
      image={post.image}
      category={post.category}
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
      fields {
        slug
      }
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
