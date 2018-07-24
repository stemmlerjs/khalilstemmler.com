import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/Navbar.module.css'

const OverlayLink = ({ path, displayName, toggleBurgerMenu }) => {
  return (
    <div
      className={styles.mobileNavItem}
      onClick={toggleBurgerMenu}
    >
      <Link to={path}>{displayName}</Link>
    </div>
  )
}

OverlayLink.propTypes = {
  path: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  toggleBurgerMenu: PropTypes.func.isRequired
}

const Overlay = props => {
  return (
    <div
      className={
        props.isOpen
          ? `${styles.overlayOpen} ${styles.overlayContainer}`
          : styles.overlayContainer
      }
    >
      <OverlayLink path={"/"} displayName="Home" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/about"} displayName="About" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/blog"} displayName="Blog" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <OverlayLink path={"/contact"} displayName="Contact" toggleBurgerMenu={props.toggleBurgerMenu}/>
      <Link onClick={props.toggleBurgerMenu} to="/contact" >
        <button className={styles.getStartedButtonOverlay}>
          Get started
        </button>
      </Link>
    </div>
  )
}

export default Overlay;