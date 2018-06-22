import React from 'react'

import styles from './styles/ContactForm.module.css'

class ContactForm extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <form
        className={styles.form}
        id="contact_form"
        action="https://formspree.io/khalilstemmler@gmail.com"
        method="POST"
      >
        <div className={styles.row}>
          <input placeholder="Your name" required type="text" name="name" />
          <input
            placeholder="Your email"
            required
            type="email"
            name="_replyto"
          />
        </div>

        <textarea
          placeholder="Your message"
          required
          type="text"
          name="message"
        />

        <input type="submit" value="Drop me a line" />
      </form>
    )
  }
}

export default ContactForm
