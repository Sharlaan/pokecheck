import React from 'react'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress/LinearProgress'

// TODO: Cross-Fade Out: https://github.com/marnusw/react-css-transition-replace
// TODO: maybe a ProgressBar would fit better to the UI, and show "Details loading..." ?
// Component isnot refreshed by parent so can't see the counter evolving...
// Try with a setInterval hack to refresh value ?
const DetailsProgress = ({ percentage }) => (
  <div style={{ position: 'relative', visibility: percentage !== 100 ? 'visible' : 'hidden' }}>
    <div style={{ zIndex: 3, position: 'absolute', top: 10, width: '100%', textAlign: 'center' }}>
      Loading pokemon details ... {percentage + ' %'}
    </div>
    <LinearProgress mode='determinate' value={percentage} />
  </div>
)

const mapStateToProps = ({ pokemonsStore: {pokemonsDetails, count} }) => {
  // TODO: why pokemonsDetails.length stops @ 810 while count = 811 o.O ??
  const percentage = parseInt(((pokemonsDetails.length / (count - 1)) * 100), 10) || 0
  return { percentage }
}

export default connect(mapStateToProps)(DetailsProgress)
