import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPokemonDetails, updateLimitPerPage } from '../actions/pokemons'

export default (WrappedComponent) => {
  class ListContainer extends Component {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    static propTypes = {
      updateLimitPerPage: PropTypes.func,
      count: PropTypes.number,
      limit: PropTypes.number,
      pokemons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      ),
      error: PropTypes.string
    }

    componentWillMount () {
      this.setState({
        showIDs: false,
        filterInput: '',
        count: this.props.count,
        pokemons: this.props.pokemons
      })
    }

    componentDidMount () {
      const { pokemons, limit } = this.props
      if (pokemons[0] && !pokemons[0].specie) {
        // Fill each pokemon's details while user is still in the list page
        // Doing so allows to calculate averages to compare pokemons,
        // before user clicks on one Pokemon
        const listIDs = pokemons.map(p => p.id)
        this.props.getPokemonDetails(listIDs, limit)
      }
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.pokemons !== this.state.pokemons) {
        this.setState({ pokemons: nextProps.pokemons })
      }
    }

    onShowIDsToggle = () => this.setState({ showIDs: !this.state.showIDs })

    handleFilterInput = (event, filterInput) => {
      // redirecting to 1st page before applying the filter
      // to prevent side-effects from unmanaged offset
      this.context.router.push('/pokemons/page1')
      const pokemons = this.props.pokemons.filter(p => p.name.includes(filterInput))
      this.setState({ filterInput, count: pokemons.length, pokemons })
    }

    handleLimitChange = (value) => (e) => this.props.updateLimitPerPage(value)

    // http://derpturkey.com/react-pass-value-with-onclick/
    // check the comment from user 'yetanotherjosh'
    handleEdit = (id) => (e) => {
      this.setState({ filterInput: '' })
      this.context.router.push(`/pokemons/page${this.props.params.page}/pokemon/${id}`)
    }

    render () {
      const { filterInput, count, pokemons, showIDs } = this.state
      const { limit, params: {page} } = this.props
      return (
        <WrappedComponent
          count={count}
          limit={limit}
          page={page}
          pokemons={pokemons}
          showIDs={showIDs}
          onShowIDsToggle={this.onShowIDsToggle}
          handleEdit={this.handleEdit}
          handleLimitChange={this.handleLimitChange}
          handleFilterInput={this.handleFilterInput}
          filterInput={filterInput}
        />
      )
    }
  }

  const mapStateToProps = ({ pokemonsStore: {pokemons, limit, count, error} }) => ({ pokemons, limit, count, error })

  const mapDispatchToProps = (dispatch) => ({
    getPokemonDetails: (listIDs, limit) => dispatch(getPokemonDetails(listIDs, limit)),
    updateLimitPerPage: (limit) => dispatch(updateLimitPerPage(limit))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ListContainer)
}
