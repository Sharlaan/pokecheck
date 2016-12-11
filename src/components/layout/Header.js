import React from 'react'
import Link from 'react-router/lib/Link'
import logo from '../../logo.svg'
import { version } from '../../../package.json'
import { lightBlue500, blue500, cyan100, transparent } from 'material-ui/styles/colors'

const styles = {
  header: { zIndex: 3, height: 70, display: 'flex', alignItems: 'center', paddingRight: 0, // eslint-disable-line
    backgroundColor: lightBlue500, boxShadow: '0px 4px 9px #C5C5C5' }, // eslint-disable-line
  logo: { height: 50, margin: '0 20px', backgroundColor: transparent },
  title: {
    height: '100%',
    lineHeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'default',
    letterSpacing: '0.05em'
  },
  mainTitle: { fontSize: 25, textShadow: `0px 0px 7px ${blue500}` },
  subTitle: { fontSize: 18, fontWeight: 300, color: cyan100 }
}

export default () => (
  <header style={styles.header}>
    <Link to='/' style={{display: 'flex'}}>
      <img style={styles.logo} src={logo} alt="logo" />
    </Link>

    <div style={styles.title}>
      <div>
        <span style={styles.mainTitle}>Pokemons Check</span>
        <span style={{marginLeft: 10}}>v{version}</span>
      </div>
      <div style={styles.subTitle}>An original way to display pokemon's data</div>
    </div>
  </header>
)
