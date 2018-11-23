import React from 'react'
import Link from 'gatsby-link'

import styles from './styles/SelectedProjects.module.css'

import univjobs from '../img/projects/uni.png'
import fran from '../img/projects/frans.png'
import blog from '../img/projects/blog.png'

const Tags = ({ tags }) => {
  return (
    <div>
      {tags.map((tag, index) => {
        return (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        )
      })}
    </div>
  )
}

const Project = ({ side, image, tags, title, text }) => {
  return (
    <div className={styles.selectedProjectContainer}>
      <div className={styles.imageContainer}>
        <img src={image} />
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Tags tags={tags} />
      </div>
    </div>
  )
}

const SelectedProjects = props => {
  return (
    <section>
      <h4>Recent Projects</h4>
      <Project
        side={'left'}
        image={univjobs}
        title={'Univjobs'}
        text={`Univjobs is a platform that fills the gap
for hiring students and recent grads for
entry-level jobs. It is an advanced 
React / Redux application that serves client requests from a robust and
scalable NodeJS microservice architecture on AWS.`}
        tags={[
          'React',
          'Redux',
          'Node',
          'Webpack',
          'Elasticache',
          'Elastic Beanstalk',
          'RDS',
          'Stripe Payments',
          'Terraform',
          'Ansible',
          'Gitlab CI'
        ]}
      />

      <Project
        side={'right'}
        image={fran}
        title={'Fran World'}
        text={`Fran World is a portfolio website I recently coded from scratch for a Hamilton-based designer. `}
        tags={['jQuery', 'PSD to HTML']}
      />

      <Project
        side={'left'}
        image={blog}
        title={'Khalil Stemmler Porfolio / Blog'}
        text={`It's my porfolio and blog that you're currently on! I built it using Gatsby and deployed it on Netlify. I use it to share
        my thoughts in JavaScript, design and Shopify.`}
        tags={['React', 'Gatsby', 'Graphql', 'CSS Modules']}
      />

      <Link to={'/work'} className={styles.seeMore}>See more work</Link>
    </section>
  )
}

export default SelectedProjects
