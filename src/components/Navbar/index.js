import React from 'react'
import PropTypes from 'prop-types'
import NavbarItem from './components/NavbarItem'
import Overlay from './components/Overlay'
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

const MobileBurgerMenu = props => {
  return (
    <div
      className={navbarStyles.burgerMenuNavItem}
      href="javascript:void(0);"
      onClick={props.toggleBurgerMenu}
    >
      <div>
        <div
          className={
            props.menuOpen
              ? `${navbarStyles.change1} ${navbarStyles.bar1}`
              : navbarStyles.bar1
          }
        />
        <div
          className={
            props.menuOpen
              ? `${navbarStyles.change2} ${navbarStyles.bar2}`
              : navbarStyles.bar2
          }
        />

        <div
          className={
            props.menuOpen
              ? `${navbarStyles.change3} ${navbarStyles.bar3}`
              : navbarStyles.bar3
          }
        />
      </div>
    </div>
  )
}

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
   * Opens the burger menu.
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
