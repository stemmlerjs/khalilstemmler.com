import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styles from '../styles/Navbar.module.css'

function renderActiveIfOnPage(page) {
  if (typeof window == 'undefined') return styles.navigationItemElement

  return !!~window.location.href.indexOf(page)
    ? `${styles.selectedItem} ${styles.navigationItemElement}`
    : styles.navigationItemElement
}

const NavbarItem = ({ path, name, displayName }) => {
  return (
    <div className={renderActiveIfOnPage(name)}>
      <Link to={path}>{displayName}</Link>
    </div>
  )
}

NavbarItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired
}

export default NavbarItem;