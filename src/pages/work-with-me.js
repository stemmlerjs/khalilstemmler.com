import React from 'react'
import Link from 'gatsby-link'

import styles from '../styles/WorkWithMe.module.css'

import Divider from '../components/Divider'

const todo = {

}

class WorkWithMe extends React.Component {
  constructor () {
    super();
    this.state = {
      todo: {
        BLOG_POSTS_DONE: false,
        RESOURCE_BLOG_DONE: false
      }
    }
  }

  componentDidMount = () => {

  }

  render = () => {
    return (
      <div>
        <h1>Let's work together</h1>

        <p>Interested in working with me? Awesome! I'm excited to meet
    you, learn more about your project, and find out ways that I
    can help you meet your goals.</p>

        <p>Before we do that, I'd like to just tell you a little bit more about
    the type of work that I do- that way, you can decide if we'd be
    a good fit to work together.</p>

        <Divider/>

        <p>I work with small to medium-sized businesses of all kinds
    looking to sell more stuff using <b>Shopify</b>. I can help you:</p>

        <ul>
          <li>develop custom Shopify apps</li>
          <li>build your custom storefront and meet complex
    requirements</li>
          <li>utilize <a href="https://www.shopify.ca/blog/the-complete-guide-to-ab-testing#whatisit">A/B testing</a>, email automation, analytics,
    and design experience to convert more traffic into paying
    customers</li>
        </ul>

        {
          this.state.todo.RESOURCE_BLOG_DONE
            ? <p>You can <Link to="/resources/20-tips">learn more</Link> about the kinds of things you can do to
    ensure your ecommerce store is performing at it's full potential.</p>
            : ''
        }
        

        <p>
          Shopify is the {
            this.state.todo.BLOG_POSTS_DONE 
              ? <Link to="/why-shopify">best ecommerce platform</Link>
              : <a href={'https://www.mlveda.com/blog/10-reasons-why-shopify-is-the-best-option/'}>best ecommerce platform</a>
          } for any new business
    to build their store on- it's why I've chosen it as the backbone
    of my freelance business. If you're established on a different
    platform (such as WooCommerce) and would like to stay there,
    or you have an entirely non-ecommerce related project (an app,
    website, some custom scripting), there are also a number of 
    <Link to="/services"> other services</Link> that I offer and can do really well.
        </p>

        <p>
          The projects I work on have a budget of at least $300 and
    are undertaken directly with clients who are looking to leverage
    my expertise to get results.
        </p>

        <p>
          If youʼre looking for a partner for ongoing work, I offer
    retainer packages starting at $1,000/month.
        </p>

        <p>
          I might not be a great fit for you if:
        </p>

        <ul>
          <li>you're an agency or a developer looking to subcontract work</li>
          <li>you're not comfortable working with a remote developer</li>
        </ul>

        <p>
          As for me, I love working with clients who:
        </p>

        <ul>
          <li>are detail-oriented</li>
          <li>are decisive</li>
          <li>like me!</li>
        </ul>

        <Divider/>

        <p>
          Still reading?
        </p>

        <p>Great! Sounds like weʼll get on well and be able to make a real
    impact on your business.</p>

        <p>Please help me understand what you need by filling out the short
    form below. Thatʼll help me prepare for an initial call with you and
    make it faster for me to put together a proposal when the time comes.</p>

        <p>Once you submit this form, weʼll get back to you within <b>24 hours</b>.</p>


        <form className={styles.formStyles} id="contact_form" action="https://formspree.io/khalilstemmler@gmail.com" method="POST">
          <h2>Your contact details</h2>

          <div>Your name (required) </div>
          <input required type="text" name="name"/>

          <div>Your email address (required) </div>
          <input required type="email" name="_replyto"/>

          <div>Your phone number (optional)</div>
          <input type="number" name="phone_number"/>

          <Divider/>

          <h2>About your business</h2>

          <div>What's the name of your business? (required) </div>
          <input required type="text" name="business_name"/>

          <div>Where is your business located? (required) </div>
          <input required type="text" name="business_location"/>

          <div>What does your business sell or do? (required) </div>
          <textarea required type="text" form="contact_form" name="business_sells"/>

          <div>Does your business have a website? (optional) </div>
          <input type="text" name="website"/>

          <div>How many people work in your business? (optional) </div>
          <select name="business_company_size" form="contact_form">
            <option value="me">Just me</option>
            <option value="2-10">2 - 10</option>
            <option value="11-30">11 - 30</option>
            <option value="30+">30+</option>
          </select>

          <Divider/>

          <h2>About your project</h2>

          <div>What type of project is it? (required) </div>
          <select required name="project_type" form="contact_form">
            <option value="custom_shopify_theme">Custom Shopify Theme</option>
            <option value="custom_shopify_application">Custom Shopify Application</option>
            <option value="moving_to_shopify">Moving to Shopify</option>
            <option value="wordpress_development">WordPress Development</option>
            <option value="app_development">Application Development</option>
            <option value="something_else">Something else</option>
          </select>

          <div>Tell me some more about your project - why are you looking to start this project? What problem are we solving by completing this project? (required) </div>
          <textarea required type="text" form="contact_form" name="why_this_project"/>

          <div>What's the budget allocated for this project? (required) </div>
          <select required name="project_budget" form="contact_form">
            <option value="300-1000">$300 - $1000</option>
            <option value="1000-5000">$1000 - $5000</option>
            <option value="5000-10000">$5000 - $10000</option>
            <option value="10000-30000">$10000 - $30000</option>
            <option value="30000+">$30000</option>
          </select>

          <div>Is there a specific deadline for this project's completion? (optional) </div>
          <input type="date" name="completion_date"/>

          <Divider/>

          <h2>A few more things</h2>

          <div>How did you hear about me? (required) </div>
          <input required type="text" name="howd_you_hear_about_me"/>

          <div>What's your favourite snack? </div>
          <input type="text" name="fav_snack"/>
          <br/><br/>
          <input type="submit" value="Submit Enquiry"/>
        </form>
        
      </div>
    )
  }
}


export default WorkWithMe
