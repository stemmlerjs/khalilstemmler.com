import ReactGA from 'react-ga'

const domain = 'khalilstemmler.com'
let id = 'NOPE'

if (document.location.hostname.indexOf(domain) !== -1) {
  id = 'UA-75700925-1'
  console.log('[Site]: Analytics started in prod.')
} else {
  console.log('[Site]: Analytics not started.')
}

ReactGA.initialize(id)

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.location.pathname)
}
