import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/Navbar.module.css'

const MobileBurgerMenu = props => {
  return (
    <div
      className={styles.burgerMenuNavItem}
      href="javascript:void(0);"
      onClick={props.toggleBurgerMenu}
    >
      <div>
        <div
          className={
            props.menuOpen
              ? `${styles.change1} ${styles.bar1}`
              : styles.bar1
          }
        />
        <div
          className={
            props.menuOpen
              ? `${styles.change2} ${styles.bar2}`
              : styles.bar2
          }
        />

        <div
          className={
            props.menuOpen
              ? `${styles.change3} ${styles.bar3}`
              : styles.bar3
          }
        />
      </div>
    </div>
  )
}

MobileBurgerMenu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleBurgerMenu: PropTypes.func.isRequired
}

export default MobileBurgerMenu;