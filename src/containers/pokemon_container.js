import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPokemon, clearPokemonStore } from '../actions/pokemon'

export default (WrappedComponent) => {
  class DetailsContainer extends Component {
    static propTypes = {
      fetchPokemon: PropTypes.func,
      error: PropTypes.string,
      name: PropTypes.string,
      stats: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
      })),
      types: PropTypes.arrayOf(PropTypes.string),
      height: PropTypes.number,
      weight: PropTypes.number,
      sprite: PropTypes.string,
      specie: PropTypes.string,
      base_experience: PropTypes.number
    }

    componentWillMount () {
      this.props.fetchPokemon(this.props.params.id)
    }

    componentWillUnmount () {
      this.props.clearPokemonStore()
    }

    render () {
      return (
        <WrappedComponent
          {...this.props}
        />
      )
    }
  }

  const mapStateToProps = ({ pokemonStore: {name, stats, types, height, weight, sprite, specie, baseExperience, error} }) => (
    { name, stats, types, height, weight, sprite, specie, baseExperience, error }
  )

  const mapDispatchToProps = (dispatch) => ({
    fetchPokemon: (id) => dispatch(fetchPokemon(id)),
    clearPokemonStore: () => dispatch(clearPokemonStore())
  })

  return connect(mapStateToProps, mapDispatchToProps)(DetailsContainer)
}
