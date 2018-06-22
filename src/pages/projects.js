import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/Projects.module.css'

const Tags = props => {
  return (
    <div>
      {props.tags.map((tag, index) => {
        return (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        )
      })}
    </div>
  )
}

const FeaturedProjects = props => {
  return (
    <section>
      {props.projects.map((project, index) => {
        return (
          <div className={styles.featuredProjectContainer} key={index}>
            <a href={project.link}>
              <img src={project.picture} />
            </a>
            <div>
              <h2>{project.title}</h2>
              <p>{project.body}</p>
              <Tags tags={project.tags} />
            </div>
          </div>
        )
      })}
    </section>
  )
}

const OtherProjects = props => {
  return (
    <section>
      {props.projects.map((project, index) => {
        return (
          <div key={index}>
            <div>
              <h2>{project.title}</h2>
              <p>{project.body}</p>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export const ProjectsPageTemplate = ({ projects }) => {
  return (
    <div>
      <h1>Featured Projects</h1>
      <FeaturedProjects projects={projects.filter(p => p.featured)} />

      <h1>Other Projects</h1>
      <OtherProjects projects={projects.filter(p => !p.featured)} />

      <h2>
        <i>More portfolio projects on the way!</i>
      </h2>
    </div>
  )
}

ProjectsPageTemplate.propTypes = {
  projects: PropTypes.array,
}

const ProjectsPage = ({ data }) => {
  const edges = data.allMarkdownRemark.edges

  return (
    <ProjectsPageTemplate projects={edges.map(edge => edge.node.frontmatter)} />
  )
}

// ProjectsPage.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.shape({
//       frontmatter: PropTypes.object,
//     }),
//   }),
// }

export default ProjectsPage

export const projectPageQuery = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            body
            featured
            link
            picture
            description
            tags
          }
        }
      }
    }
  }
`
