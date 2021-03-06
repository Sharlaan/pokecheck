import React from 'react'
import { connect } from 'react-redux'
import RefreshIndicator from 'material-ui/RefreshIndicator/RefreshIndicator'

const size = 70

// TODO: Cross-Fade Out: https://github.com/marnusw/react-css-transition-replace
// TODO: maybe a ProgressBar would fit better to the UI, and show "Details loading..." ?
// Component isnot refreshed by parent so can't see the counter evolving...
// Try with a setInterval hack to refresh value ?
const DetailsProgress = ({ percentage }) => (
  <div style={{ position: 'relative', width: size / 2 }}>
    <div style={{ zIndex: 3, position: 'absolute', top: size * 0.357, textAlign: 'center', width: size }}>
      {percentage + ' %'}
    </div>
    <RefreshIndicator
      status='ready'
      percentage={percentage}
      size={size}
      top={0}
      left={0}
    />
  </div>
)

const mapStateToProps = ({ pokemonsStore: {pokemonsDetails, count} }) => {
  const percentage = parseInt(((pokemonsDetails.length / count) * 100), 10)
  return { percentage }
}

export default connect(mapStateToProps)(DetailsProgress)
