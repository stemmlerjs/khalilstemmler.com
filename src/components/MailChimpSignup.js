import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

import styles from "./styles/MailChimpSignup.module.css";

import meGlitched from "../img/me-glitched.jpg";

// https://gumroad.com/resource-center/building-your-email-list
// https://www.blogtyrant.com/make-ebook/
// https://www.blogtyrant.com/how-to-write-the-perfect-blog-post/
// https://news.ycombinator.com/item?id=16283959

let isEbookReady = false;

import nprogress from "nprogress";

const SubscribeComponent = () => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <img src={meGlitched} />
      </div>
      <div className={styles.title}>
        Master modern JavaScript, with or without semicolons!
      </div>
      <div className={styles.text}>
        Join a community of ninja JS-ers who are learning how to code, building
        their portfolios, and deploying to prod!
        {isEbookReady
          ? ` You'll get my best JavaScript content each week. You'll also get a copy of my free ebook,
    "JS in Prod: 5 Tools You Really Should Be Using, Yesterday".`
          : ` You'll get my best JavaScript content each week (tips, tricks, tutorials).`}
      </div>
      <div className={styles.label} />
      <input
        placeholder="Your email address"
        required
        type="email"
        name="email"
      />
      <input
        className={styles.submit}
        value={isEbookReady ? "Get the ebook" : "Get tips"}
        type="submit"
      />
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

  _handleSubmit = async email => {
    nprogress.start();
    try {
      const result = await addToMailchimp(email);
      // Send them somewhere or show them something.
      nprogress.done();
      this.setState({
        ...this.state,
        didSubscribe: true
      })
    } catch (err) {
      // Present an error message to them.
      nprogress.done();
    }
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
