import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.png'
import smallLogo from '../img/small-logo.png'

import navbarStyles from '../styles/Navbar.module.css'

const GetStartedButton = () => {
  return (
    <Link to="/contact">
      <button className={navbarStyles.getStartedButton}>
      Get started
      </button>
    </Link>
  )
}

function renderActiveIfOnPage (page) {
  if (typeof window == "undefined") return navbarStyles.navigationItemElement;
  
  return !!~window.location.href.indexOf(page)
    ? `${navbarStyles.selectedItem} ${navbarStyles.navigationItemElement}`
    : navbarStyles.navigationItemElement
}

const MobileBurgerMenu = (props) => {
  return (
    <div className={navbarStyles.burgerMenuNavItem} href="javascript:void(0);" onClick={props.toggleBurgerMenu}>
      <div>
        <div className={
          props.menuOpen 
            ? `${navbarStyles.change1} ${navbarStyles.bar1}`
            : navbarStyles.bar1}>
        </div>
        <div className={
          props.menuOpen 
            ? `${navbarStyles.change2} ${navbarStyles.bar2}`
            : navbarStyles.bar2}>
        </div>

        <div className={
          props.menuOpen 
            ? `${navbarStyles.change3} ${navbarStyles.bar3}`
            : navbarStyles.bar3}>
        </div>
      </div>
    </div>
  )
}

const Overlay = (props) => {
  return (
    <div className={props.isOpen 
      ? `${navbarStyles.overlayOpen} ${navbarStyles.overlayContainer}`
      : navbarStyles.overlayContainer}>

      <div onClick={props.toggleBurgerMenu}><Link to="/">Home</Link></div>
      <div onClick={props.toggleBurgerMenu}><Link to="/about">About</Link></div>
      <div onClick={props.toggleBurgerMenu}><Link to="/blog">Blog</Link></div>
      {/*<h1 onClick={props.toggleBurgerMenu}><Link to="/projects">Work</Link></h1>*/}
      
      <div onClick={props.toggleBurgerMenu}><Link to="/contact">Contact</Link></div>
      <div onClick={props.toggleBurgerMenu}><Link to="/services">Services</Link></div>
      <Link onClick={props.toggleBurgerMenu} to="/work-with-me">
        <button className={navbarStyles.getStartedButtonOverlay}>Get started</button>
      </Link>

    </div>
  )
}

class Navbar extends React.Component {
  constructor () {
    super();

    this.state = {
      menuOpen: false
    };
  }

  /**
   * openBurgerMenu
   * 
   * Opens the burger menu.
   */

  toggleBurgerMenu = () => {
    this.setState({
      ...this.state,
      menuOpen: !this.state.menuOpen
    })
  }

  componentDidMount = () => {

  }

  render = () => {
    return (
      <nav className={navbarStyles.container}>
        <div className={navbarStyles.logoContainer}>
          <Link to="/">
            <img id="test" className={navbarStyles.regularLogo} src={logo}/>
          </Link>

          <Link to="/">
            <img className={navbarStyles.smallLogo} src={smallLogo}/>
          </Link>
        </div>
        <div className={navbarStyles.navigationItems}>
          <div className={renderActiveIfOnPage('about')}><Link to="/about">About</Link></div>
          <div className={renderActiveIfOnPage('blog')}><Link to="/blog">Blog</Link></div>
          <div className={renderActiveIfOnPage('services')}><Link to="/services">Services</Link></div>
          {/*<h2 className={renderActiveIfOnPage('projects')}><Link to="/projects">Projects</Link></h2>*/}
          <div className={renderActiveIfOnPage('contact')}><Link to="/contact">Contact</Link></div>
          <GetStartedButton/>
        </div>
          {
            /**
             * Mobile nav
             */
          }
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
