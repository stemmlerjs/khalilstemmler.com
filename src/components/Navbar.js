import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

import navbarStyles from '../styles/Navbar.module.css'

const Navbar = () => (
  <nav className={navbarStyles.container}>
    <div className={navbarStyles.logoContainer}>
      <div className={navbarStyles.name}><Link to="/">Annick Beau</Link></div>
      <div className={navbarStyles.title}>Makeup Artist</div>
    </div>
    <div className={navbarStyles.navigationItems}>
      <div className={navbarStyles.navigationItemElement}>
        <Link to="/blog">Blog</Link>
      </div>
      <div className={navbarStyles.navigationItemElement}>
        <Link to="/about">About</Link>
      </div>
    </div>
  </nav>
)

export default Navbar
