import React from 'react'
import { connect } from 'react-redux'
import RefreshIndicator from 'material-ui/RefreshIndicator/RefreshIndicator'

const size = 70

// TODO: Cross-Fade Out: https://github.com/marnusw/react-css-transition-replace
// TODO: maybe a ProgressBar would fit better to the UI, and show "Details loading..." ?
const DetailsProgress = ({ pokemonsDetails, count }) => {
  const percentage = parseInt(((pokemonsDetails.length / count) * 100), 10) || 0
  if (percentage === 100) return <div>Details fully loaded !</div>
  return (
    <div style={{ position: 'relative', width: size / 2 }}>
      <div style={{ zIndex: 3, position: 'absolute', top: size * 0.357, textAlign: 'center', width: size }}>
        {(((pokemonsDetails.length / count) * 100).toFixed(0) || 0) + ' %'}
      </div>
      <RefreshIndicator
        status='ready'
        percentage={percentage}
        size={70}
        top={0}
        left={0}
      />
    </div>
  )
}

const mapStateToProps = ({ pokemonsStore: {pokemonsDetails, count} }) => ({ pokemonsDetails, count })

export default connect(mapStateToProps)(DetailsProgress)
