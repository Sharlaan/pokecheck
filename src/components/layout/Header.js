import React from 'react'
import Link from 'react-router/lib/Link'
import logo from '../../logo.svg'
import { lightBlue500, blue500, cyan100, transparent } from 'material-ui/styles/colors'

const styles = {
  header: { height: 70, display: 'flex', alignItems: 'center', paddingRight: 0, backgroundColor: lightBlue500 },
  logo: { height: 60, margin: '0 10px', backgroundColor: transparent },
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
      <div style={styles.mainTitle}>Pokemons Check</div>
      <div style={styles.subTitle}>An original way to display pokemon's data</div>
    </div>
  </header>
)
