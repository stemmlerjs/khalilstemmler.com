import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, content, contentComponent, displayPicture }) => {
  const PageContent = contentComponent || Content

  return (
    <section>
      <h1>{title}</h1>
      <div style={{ textAlign: 'center'}}>
        <img style={{ borderRadius: '100%', height: '10em'}} src={displayPicture}/>
      </div>
      <PageContent className="content" content={content} />
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data
  
  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
      displayPicture={post.frontmatter.display_picture}
    />
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        display_picture
      }
    }
  }
`
