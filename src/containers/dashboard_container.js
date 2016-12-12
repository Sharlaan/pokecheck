import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAllPokemons } from '../actions/pokemons'

export default (WrappedComponent) => {
  class DashboardContainer extends Component {
    static propTypes = {
      fetchAllPokemons: PropTypes.func,
      error: PropTypes.string
    }

    componentDidMount () {
      this.props.fetchAllPokemons(this.props.limit)
    }

    render () {
      return <WrappedComponent />
    }
  }

  const mapStateToProps = ({ pokemonsStore: {limit} }) => ({ limit })

  const mapDispatchToProps = (dispatch) => ({
    fetchAllPokemons: () => dispatch(fetchAllPokemons())
  })

  return connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
}
