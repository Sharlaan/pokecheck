import React from 'react'
import Image from './Image'
import UnknownImg from '../../unknown.png'
import { getSpritesCDNurl } from '../../helpers'

const styles = {
  main: {
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.26)',
    transition: '0.3s',
    display: 'inline-block',
    margin: 10
  },
  img: { width: 150, margin: '0 15px' },
  footer: {
    color: 'white',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    padding: '20px 20px 10px',
    opacity: 0.7,
    textAlign: 'left'
  },
  id: { float: 'right' }
}

export default ({id, title, showIDs, onTouchTap}) => (
  <div style={styles.main} className='pokemon' onTouchTap={onTouchTap}>
    <Image
      src={getSpritesCDNurl(id)}
      defaultImg={UnknownImg}
      style={styles.img}
      alt={`${name}'s icon`}
    />
    <footer style={styles.footer}>
      <span>{title}</span>
      <div style={{ ...styles.id, visibility: showIDs ? 'visible' : 'hidden' }}>{id}</div></footer>
  </div>
)
