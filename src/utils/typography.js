import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: '#e30000',
    textShadow: 'none'
  },
  '.blog-item': {
    marginBottom: '80px'
  },
  '.blog-item small': {
    color: '#999',
    fontSize: '14px',
    display: 'block'
  },
  '.blog-item p': {
    marginTop: '10px'
  },
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  'a.anchor': {
    boxShadow: 'none',
    backgroundImage: 'none'
  },
  'p code': {
    fontSize: '1.1rem'
  },
  'li code': {
    fontSize: '1rem'
  },
  'h1, h2, h3, h4': {
    fontFamily: 'Montserrat,sans-serif'
  },
  'h5': {
    fontSize: '1rem',
    lineHeight: '1.7',
    marginBottom: '.5rem'
  }
})

Wordpress2016.googleFonts.push({
  name: 'IBM Plex Mono',
  styles: ['400', '500']
})

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
