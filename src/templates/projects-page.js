import React from 'react'
import PropTypes from 'prop-types'
// import Features from '../components/Features'
// import Testimonials from '../components/Testimonials'
// import Pricing from '../components/Pricing'

export const ProjectsPageTemplate = ({
  projects
}) => (
  <section className="section section--gradient">
    <div className="container">
      {
        projects.map((project, index) => {
          return <div key={index}>{project.title}</div>
        })
      }
    </div>
  </section>
)

ProjectsPageTemplate.propTypes = {
  projects: PropTypes.array
}

const ProjectsPage = ({ data }) => {
  console.log(data)
  const { frontmatter } = data.allMarkdownRemark.edges[0].node

  return (
    <ProjectsPageTemplate
      projects={frontmatter.projects}
    />
  )
}

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProjectsPage

export const projectPageQuery = graphql`
  query ProjectsPageQuery {
  allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "projects-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            projects {
              title
              body
              featured
              picture
            }
          }
        }
      }
    }
  }
`
