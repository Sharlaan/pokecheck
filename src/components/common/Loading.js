import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator/RefreshIndicator'
import { deepOrange400 } from 'material-ui/styles/colors'

const size = 70

export default () => (
  <div style={{ marginTop: '20%', position: 'relative', width: size / 2 }}>
    <RefreshIndicator
      status='loading'
      loadingColor={deepOrange400}
      size={size}
      top={0}
      left={0}
    />
  </div>
)
