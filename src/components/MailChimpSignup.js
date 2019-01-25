import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import styles from "./styles/MailChimpSignup.module.css";
import meGlitched from "../img/me-glitched.jpg";
import nprogress from "nprogress";

const SubscribeComponent = () => {
  return (
    <div className="mailchimp-subscribe-component">
      <div className={styles.imageContainer}>
        <img src={meGlitched} />
      </div>
      <div className={styles.title}>
        About me, the author
      </div>
      <div className={styles.text}>
        I'm a developer/musician most interested in JavaScript, software development, music and art (and the divine intersection of all of those things).
      </div>
      <div className={styles.label} />
      <span className={styles.text}>I'm also on </span>
      <a className="fancy-link" href="https://instagram.com/stemmlerjs">Instagram,</a>&nbsp;&nbsp;
      <a className="fancy-link" href="https://twitter.com/stemmlerjs">Twitter,</a>&nbsp;&nbsp;<br/>
      <a className="fancy-link" href="https://www.linkedin.com/in/khalilstemmler/">LinkedIn</a>
      {/* <input
        placeholder="Your email address"
        required
        type="email"
        name="email"
      />
      <input
        className={styles.submit}
        value={isEbookReady ? "Get the ebook" : "Get new blog post notifications"}
        type="submit"
      /> */}
    </div>
  );
};

const AfterSubscribeComponent = () => {
  return (
    <div className={styles.text}>
      Nice! You're all joined up!<br/>
      I'll send you useful things you can use to level up your JS and find work.<br/>
    </div>
  )
}

export default class MailChimpComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      isSubscribing: false,
      isSubscribingSuccess: false,
      isSubscribingFailure: false,
      didSubscribe: false
    };
  }

  _handleSubmit = (email) => {
    nprogress.start();

    return addToMailchimp(email)
      .then((result) => {
        // Send them somewhere or show them something.
        nprogress.done();
        this.setState({
          ...this.state,
          didSubscribe: true
        })
      })
      .catch ((err) => {
        // Present an error message to them.
        nprogress.done();
        alert("Looks like an error occurred. Couldn't add ya to the email list :( Let me know please @ khalilstemmler@gmail.com.")
      })
  };

  render() {
    return (
      <form
        className={styles.container}
        onSubmit={e => {
          e.preventDefault();
          let email = e.target.elements.email.value;
          this._handleSubmit(email);
        }}
      >
        {this.state.didSubscribe ? <AfterSubscribeComponent/> : <SubscribeComponent />}
      </form>
    );
  }
}
