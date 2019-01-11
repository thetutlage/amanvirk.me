import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Harminder Virk`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Blog by <a href="https://twitter.com/AmanVirk1">Harminder Virk</a>.
          <br />
          <span style={{
            color: '#999'
          }}>Sharing my personal learnings :)</span>
        </p>
      </div>
    )
  }
}

export default Bio
