
import React from 'react'

import styles from './styles/BlockQuote.module.css'

const BlockQuote = (props) => {
  return (
    <quote className={styles.blockQuote}>
      <div>
        <p>{props.text}</p>
        {
          !!props.author == true
          ? <p>- {props.author}, <a href={props.authorCompanySite}>{props.authorCompany}</a></p>
          : ''
        }
        
      </div>
    </quote>
  )
}

export default BlockQuote