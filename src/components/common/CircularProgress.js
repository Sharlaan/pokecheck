import React, { Component } from 'react'
import { connect } from 'react-redux'
import RefreshIndicator from 'material-ui/RefreshIndicator/RefreshIndicator'

const size = 70

// TODO: Cross-Fade Out: https://github.com/marnusw/react-css-transition-replace
// TODO: maybe a ProgressBar would fit better to the UI, and show "Details loading..." ?
// Component isnot refreshed by parent so can't see the counter evolving...
// Try with a setInterval hack to refresh value ?
class DetailsProgress extends Component {
  componentWillMount () {
    this.setState({ percentage: 0 })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pokemonsDetails.length !== this.props.pokemonsDetails.length) {
      this.setState({ percentage: parseInt(((nextProps.pokemonsDetails.length / this.props.count) * 100), 10) })
    }
  }

  render () {
    if (this.state.percentage === 100) return <div>Details fully loaded !</div>
    return (
      <div style={{ position: 'relative', width: size / 2 }}>
        <div style={{ zIndex: 3, position: 'absolute', top: size * 0.357, textAlign: 'center', width: size }}>
          {this.state.percentage + ' %'}
        </div>
        <RefreshIndicator
          status='ready'
          percentage={this.state.percentage}
          size={70}
          top={0}
          left={0}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ pokemonsStore: {pokemonsDetails, count} }) => ({ pokemonsDetails, count })

export default connect(mapStateToProps)(DetailsProgress)
