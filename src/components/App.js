import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

const style = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
}

export default ({ children }) => (
  <div>
    <Header />

    <section style={style}>{children}</section>

    <Footer />
  </div>
)
