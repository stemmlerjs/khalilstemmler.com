import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import { DemoAndRepo } from "../components/Work";
import styles from "../components/Work/styles/WorkPage.module.css";

/**
 * Best projects:
 * - univjobs
 * - Health Espresso (https://www.icarehomehealth.ca/health-espresso/) - speak about the tool I personally built - software architecture
 * - Glitch Software
 *    - version 1: written in Java
 *    - 
 * - Pacer
 * - Mailer
 *
 */

export const WorkPageTemplate = ({
  title,
  description,
  demo,
  repo,
  content,
  contentComponent,
  image
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className={"scene_element--fadein "}>
      <h1>{title}</h1>
      <div className={styles.content}>{description}</div>
      <DemoAndRepo demo={demo} repo={repo} />
      <div style={{ marginTop: '25px'}}>
        <PageContent className="content" content={content} />
      </div>
    </section>
  );
};

WorkPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  demo: PropTypes.string,
  repo: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const WorkPage = ({ data }) => {
  const { markdownRemark: work } = data;

  return (
    <WorkPageTemplate
      contentComponent={HTMLContent}
      title={work.frontmatter.title}
      description={work.frontmatter.description}
      demo={work.frontmatter.demoUrl}
      repo={work.frontmatter.repoUrl}
      content={work.html}
      image={work.frontmatter.image}
    />
  );
};

WorkPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default WorkPage;

export const workPageQuery = graphql`
  query WorkPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        image
        repoUrl
        demoUrl
      }
    }
  }
`;
