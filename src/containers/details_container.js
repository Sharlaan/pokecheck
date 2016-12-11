import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export default (WrappedComponent) => {
  class DetailsContainer extends Component {
    static propTypes = {
      error: PropTypes.string,
      averages: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        averages: PropTypes.shape({
          [PropTypes.string]: PropTypes.number // statName: mean value
        })
      })),
      pokemonsDetails: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        stats: PropTypes.shape({
          [PropTypes.string]: PropTypes.number
        }),
        types: PropTypes.arrayOf(PropTypes.string),
        height: PropTypes.number,
        weight: PropTypes.number,
        specie: PropTypes.string,
        base_experience: PropTypes.number
      }))
    }

    componentWillMount () {
      const { pokemonsDetails, averages, params: {id} } = this.props
      const currentPokemon = pokemonsDetails.find(pk => pk.id === +id)
      const avg = averages.filter(a => currentPokemon.types.includes(a.type))
      this.setState({ currentPokemon, averages: avg })
    }

    // since props.pokemons may still be receiving data to fill pokemons' details
    // this method prevents unnecessary updating of this page if not concerned with
    // updates in background
    shouldComponentUpdate (nextProps) {
      const { currentPokemon, averages } = this.state
      const isThisPokemonUpdated = nextProps.pokemonsDetails.find(pk => pk.id === +this.props.params.id) !== currentPokemon
      const areAveragesUpdated = nextProps.averages.filter(a => currentPokemon.types.includes(a.type)) !== averages
      return areAveragesUpdated && isThisPokemonUpdated
    }

    render () {
      return (
        <WrappedComponent
          {...this.state.currentPokemon}
          averages={this.state.averages}
          error={this.props.error}
        />
      )
    }
  }

  const mapStateToProps = ({ pokemonsStore: {pokemonsDetails, averages, error} }) => ({ pokemonsDetails, averages, error })

  return connect(mapStateToProps)(DetailsContainer)
}
