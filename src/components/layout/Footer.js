import React from 'react'

export default () => {
  const year = new Date().getFullYear()

  return (
    <footer style={{ padding: 10, textAlign: 'center' }}>
      <p>Sharlaan © {year}. Tous droits réservés.</p>
    </footer>
  )
}
