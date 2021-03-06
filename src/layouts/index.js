import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import './all.sass'
import $ from 'jquery'

import styles from '../styles/Index.module.css'

import './animations.css'
import './prism.css'
import './dist/ngprogress.css'

import { scrollToY } from '../utils/utils'

class TemplateWrapper extends React.Component {
  constructor() {
    super()
  }

  animate() {
    // if (typeof document !== undefined)
    //   document.querySelector('#root')
    //     .animate({
    //       opacity: [0, 1],
    //       easing: 'ease-out'
    //   }, {
    //       direction: 'alternate',
    //       duration: 1500,
    //   });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.animate()

    if (typeof window !== undefined) {
      require('./dist/smooth.js')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.animate()
    }
  }

  /**
   * handleScroll
   *
   * When we're further down the page, we want to provide the
   * ability to scroll to the top. To do this, we utilize a
   * scroll to the top button that only becomes visible
   * when we're a certain length of pixels scrolled down in the page.
   *
   * @param {Event}\
   * @return void
   */

  handleScroll(event) {
    let distanceFromTop = 150
    let element = document.getElementById('to-top-button')
    if (element) {
      if (
        document.body.scrollTop > distanceFromTop ||
        document.documentElement.scrollTop > distanceFromTop
      ) {
        element.style.opacity = '1'
      } else {
        element.style.opacity = '0'
      }
    }
  }

  handleScrollToTop() {
    scrollToY(0, 1500, 'easeInOutQuint')
  }

  render() {
    return (
      <div id="root">
        <Helmet
          title="Khalil Stemmler - Software Developer / Designer"
          meta={[
            // Server side rendering meta data
            { property: 'og:title', content: 'Khalil Stemmler - Software Developer / Designer & Musician' },
            { property: 'og:description', content: 'Khalil Stemmler - Software Developer / Designer & Musician' },
            { property: 'og:type', content: 'site' },
            { property: 'og:url', content: 'khalilstemmler.com' },
            { name: 'theme-color', content: '#ee009e' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            {
              name: 'keywords',
              content:
                'javascript developer, javascript developer toronto, musician, entrepreneur, software developer'
            },
            { name: 'author', content: 'Khalil Stemmler' },
            {
              name: 'description',
              content:
                `Khalil Stemmler is a Software Developer / Designer & Musician in Toronto specializing in full-stack JavaScript development with React, Redux and Node.js.
                He creates writes about JavaScript, music, design, and anything that involves all three.`,
            },
          ]}
          /**
           * Load stylesheets and fonts here.
           */

          link={[
            {
              href:
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
              rel: 'stylesheet',
              type: 'text/css',
            },
          ]}
        />
        <Navbar style={{ maxWidth: '1260px', margin: '0 auto' }} />
        <div
          onClick={this.handleScrollToTop}
          className={styles.toTopButton}
          id="to-top-button"
        >
          <i className={'fa fa-angle-up'} />
        </div>

        {/**
         * #main
         *
         * We're using SmoothState.js https://css-tricks.com/add-page-transitions-css-smoothstate-js/
         * The initial load has a smooth render and every other page
         * needs a specific thing on it.
         */}

        <div
          id="main"
          style={{ maxWidth: '1260px', margin: '0 auto', minHeight: '58%' }}
          className={`${styles.container} scene_element_initial--fadein `}
        >
          {this.props.children()}
        </div>
        <Footer />
      </div>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
