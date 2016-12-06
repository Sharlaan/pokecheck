import React from 'react'
import CircularProgress from 'material-ui/CircularProgress/CircularProgress'
import { deepOrange400 } from 'material-ui/styles/colors'

export default () => (
  <div style={{ marginTop: 25, display: 'flex', justifyContent: 'center' }}>
    <CircularProgress color={deepOrange400} thickness={5} />
  </div>
)
