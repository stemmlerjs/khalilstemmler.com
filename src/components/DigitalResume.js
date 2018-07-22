import React from 'react'

import styles from './styles/DigitalResume.module.css'

import emojiis from '../img/emojiis.png'

const pages = {
  development: {
    sections: [
      {
        title: 'Front',
        elements: [
          {
            name: 'JavaScript',
            text: `ES6 • React • Redux • Gatsby • Mocha/Chai • Electron • Webpack • Gulp • Lint • jQuery • AngularJS`,
          },
          {
            name: 'HTML + CSS',
            text: `styled-components • CSS Modules • Bootstrap • Sass • Pug • Jade • Responsive Websites • Handlebars • CSS Grid (Pure CSS)`,
          },
          {
            name: 'Integrations',
            text: `Stripe Payments • Mixpanel • Shopify Polaris • Web Audio API`,
          },
          {
            name: 'Design',
            text: `Adobe XD • Figma • InVision`,
          },
        ],
      },
      {
        title: 'Back',
        elements: [
          {
            name: 'Backend',
            text: `Node.js • MySQL/MariaDB • Elasticsearch • Redis • Python • Ruby • Sinatra`,
          },
          {
            name: 'Services',
            text: `Vagrant • Ansible • AWS • Jenkins • Gitlab CI • PM2`,
          },
          {
            name: 'Toolset',
            text: `Git • Visual Studio Code • Sublime Text • Slack • Asana • Gitlab Kanban`,
          },
        ],
      },
    ],
  },
  experience: {
    sections: [
      {
        title: 'Now',
        elements: [
          {
            name: 'Freelance Web Dev',
            header: 'Freelance',
            text: `⇢ Freelance work with a focus on full-stack web development using modern
front-end technologies. Working for clients in Canada.`,
          },
          {
            name: 'Lead Developer',
            header: 'Univjobs, Oakville ON',
            text: [
              `⇢ Led the development and design of the Univjobs student recruitment platform.`,
              `⇢ Works as part of a small dev team in the full stack development the platform 
     using modern web technologies (Node.js, Express, React, Redis, AWS, 
     and MariaDB).`,
            ],
          },
        ],
      },
      {
        title: '2016',
        elements: [
          {
            name: 'Software Developer',
            header: 'Pinnaca, Toronto',
            text: [
              `⇢ Redesigned and developed outdated internal tools using Angular and Java.`,
              `⇢ Improved speed and reliability on older Angular 1x apps.`,
              `⇢ Created an AngularJS authentication library for SSO-integrated apps.`,
              `⇢ Developed solutions for ad-hoc data migration projects.`,
            ],
          },
        ],
      },
      {
        title: '2015',
        elements: [
          {
            name: 'Java Developer',
            header: 'Jomar Softcorp International, Cambridge',
            text: [
              `⇢ Worked on Jomar’s proprietary ERP system as a Java/SQL Developer`,
              `⇢ Implemented an XML/XSL driven PDF letter generator with Java and SQL.`,
              `⇢ Rapidly designed, program, tested and documented new application features.`,
            ],
          },
          {
            name: 'BI Analyst',
            header: 'IBM Canada, Ottawa',
            text: [
              `⇢ Troubleshoot tier 2 issues with the IBM Cognos Business Intelligence software in 
     customer configurations for a variety of distributed environments.`,
              `⇢ Personified and upheld the reputation of IBM with a 90% total customer satisfaction 
     rating by meeting deadlines for all customers.`,
              `⇢ Demonstrated a strong ability to break down technical concepts to high level English 
     by helping a customer understand the allocation of memory in the Java Virtual Machine.`,
              `⇢ Troubleshot and gave recommendations on components related to Report Design, 
     SQL, Database Connectivity, Metadata Management and Server Tuning.`,
            ],
          },
        ],
      },
    ],
  },
  education: {
    sections: [
      {
        title: '2013 - 2018',
        elements: [
          {
            name: 'Bachelor of Science',
            header:
              'Brock University, Computer Science Honors (1st Class Standing)',
            text: `Graduated from Brock University in 2018 with 1st class standing with a 
focus on software engineering.`,
          },
        ],
      },
      {
        title: '2013 - 2017',
        elements: [
          {
            name: 'Dip. Internet Comm Tech',
            header: 'Sheridan College, Internet Communications Technology',
            text: `Graduated from Sheridan College in 2017.
Telus Award 2017, 
Juniper Award, 
Telus Award 2016.`,
          },
        ],
      },
    ],
  },
}

const SelectionNav = ({ currentPage, handleChangePage }) => {
  return (
    <div className={styles.selectionNavContainer}>
      <div
        onClick={() => handleChangePage('DEVELOPMENT')}
        className={
          currentPage == 'DEVELOPMENT'
            ? `${styles.selectionNavItem} ${styles.selected}`
            : styles.selectionNavItem
        }
      >
        Development
      </div>

      <div
        onClick={() => handleChangePage('EXPERIENCE')}
        className={
          currentPage == 'EXPERIENCE'
            ? `${styles.selectionNavItem} ${styles.selected}`
            : styles.selectionNavItem
        }
      >
        Experience
      </div>
      <div
        onClick={() => handleChangePage('EDUCATION')}
        className={
          currentPage == 'EDUCATION'
            ? `${styles.selectionNavItem} ${styles.selected}`
            : styles.selectionNavItem
        }
      >
        Education
      </div>
    </div>
  )
}

const Page = ({ data }) => {
  return (
    <div className={styles.pageContainer}>
      {data.sections.map((section, index) => {
        return (
          <div key={index}>
            <div className={styles.sectionTitle}>{section.title}</div>

            {section.elements.map((element, index) => {
              return (
                <div className={styles.row}>
                  <div className={styles.columnLeft}>
                    <div className={styles.elementName}>{element.name}</div>
                  </div>
                  <div className={styles.columnRight}>
                    <div className={styles.header}>{element.header}</div>
                    {typeof element.text == 'object' ? (
                      element.text.map((el, index) => {
                        return <div key={index}>{el}</div>
                      })
                    ) : (
                      <div>{element.text}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

class DigitalResume extends React.Component {
  constructor() {
    super()

    this.state = {
      page: 'DEVELOPMENT',
    }

    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage(nextPage) {
    this.setState({
      ...this.state,
      page: nextPage,
    })
  }

  render() {
    return (
      <div id="about" className={styles.container}>
        <h4>About</h4>
        <div className={styles.heroContainer}>
          <div className={styles.imageContainer}>
            <img src={emojiis} />
          </div>
          <div className={styles.heroTextContainer}>
            <h3>For the love of building</h3>
            <div>
              Building good products is my passion. Here's my virtual resume.
            </div>
          </div>
        </div>

        <SelectionNav
          currentPage={this.state.page}
          handleChangePage={this.handleChangePage}
        />

        <Page
          data={
            this.state.page == 'DEVELOPMENT'
              ? pages.development
              : this.state.page == 'EXPERIENCE'
                ? pages.experience
                : this.state.page == 'EDUCATION' ? pages.education : ''
          }
        />
      </div>
    )
  }
}

export default DigitalResume
