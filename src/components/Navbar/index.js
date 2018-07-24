import React from 'react'
import PropTypes from 'prop-types'
import NavbarItem from './components/NavbarItem'
import Overlay from './components/Overlay'
import MobileBurgerMenu from './components/MobileBurgerMenu'
import Link from 'gatsby-link'
import github from '../../img/github-icon.svg'
import logo from '../../img/logo.png'
import smallLogo from '../../img/small-logo.png'
import navbarStyles from './styles/Navbar.module.css'

const GetStartedButton = () => {
  return (
    <Link to="/contact">
      <button className={navbarStyles.getStartedButton}>Get started</button>
    </Link>
  )
}

/**
 * @class Navbar
 * @desc This is the navbar that is shown across the screen
 * on all sizes. When it's resized to a certain point, the mobile
 * nav is shown.
 * 
 * Allows the user to open the Overlay component.
 * @see Overlay.js
 */

class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {
      menuOpen: false,
    }
  }

  /**
   * openBurgerMenu
   *
   * @desc Opens the burger menu.
   * @return void
   */

  toggleBurgerMenu = () => {
    this.setState({
      ...this.state,
      menuOpen: !this.state.menuOpen,
    })
  }

  componentDidMount = () => {}

  render = () => {
    return (
      <nav className={navbarStyles.container}>
        <div className={navbarStyles.logoContainer}>
          <Link to="/">
            <img id="test" className={navbarStyles.regularLogo} src={logo} />
          </Link>
          <Link to="/">
            <img className={navbarStyles.smallLogo} src={smallLogo} />
          </Link>
        </div>
        <div className={navbarStyles.navigationItems}>
          <NavbarItem name="about" path="/about" displayName="About"/>
          <NavbarItem name="blog" path="/blog" displayName="Blog"/>
          <NavbarItem name="contact" path="/contact" displayName="Contact" />
          <NavbarItem name="work" path="/work" displayName="Work" />
          <GetStartedButton />
        </div>
        {/**
         * Mobile nav
         */}
        <MobileBurgerMenu
          menuOpen={this.state.menuOpen}
          toggleBurgerMenu={this.toggleBurgerMenu}
        />
        <Overlay
          isOpen={this.state.menuOpen}
          toggleBurgerMenu={this.toggleBurgerMenu}
        />
      </nav>
    )
  }
}

export default Navbar
