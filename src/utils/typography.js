import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: '1.78',
  headerFontFamily: ['Roboto', 'sans-serif'],
  headerWeight: '700',
  bodyFontFamily: ['Nunito', 'Roboto', 'Roboto Mono', 'sans-serif'],
  bodyColor: '#2D2D2D',
  bodyBoldWeight: '700',
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    p: {
      fontSize: '18px',
    },
    h4: {
      lineHeight: '1.4em',
      margin: '0',
      color: '#c9c9c9',
      fontSize: '1.1em !important',
    },
    pre: {
      marginTop: '3em !important',
      marginBottom: '3em !important',
      borderRadius: '0 !important',
    },
    ol: {
      fontSize: '1.3em',
    },
    // blockquote: {
    //   ...adjustFontSizeTo('19px'),
    //   color: gray(41),
    //   fontStyle: 'italic',
    //   paddingLeft: rhythm(13/16),
    //   marginLeft: rhythm(-1),
    //   borderLeft: `${rhythm(3/16)} solid ${gray(10)}`,
    // },
    // 'blockquote > :last-child': {
    //   marginBottom: 0,
    // },
  }),
})

typography.injectStyles()

export default typography
