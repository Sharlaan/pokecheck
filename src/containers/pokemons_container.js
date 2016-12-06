import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAllPokemonsPaginated, updateLimitPerPage } from '../actions/pokemons'

export default (WrappedComponent) => {
  class ListContainer extends Component {
    static contextTypes = {
      router: PropTypes.object.isRequired
    }

    static propTypes = {
      fetchAllPokemons: PropTypes.func,
      updateLimitPerPage: PropTypes.func,
      count: PropTypes.number,
      limit: PropTypes.number,
      pokemons: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          name: PropTypes.string,
          id: PropTypes.number,
          sprite: PropTypes.string
        })
      ),
      error: PropTypes.string
    }

    componentWillMount () {
      this.props.fetchAllPokemonsPaginated(this.props.limit)
      this.setState({ showIDs: false })
    }

    componentWillReceiveProps (nextProps) {
      const { limit, params: {page} } = this.props
      if (nextProps.params.page !== page || nextProps.limit !== limit) {
        const p = (nextProps.params.page !== page) ? nextProps.params.page : page
        const o = (p - 1) * limit
        const l = (nextProps.limit !== limit) ? nextProps.limit : limit

        this.props.fetchAllPokemonsPaginated(l, o)
      }
    }

    onShowIDsToggle = () => this.setState({ showIDs: !this.state.showIDs })

    handleLimitChange = (value) => (e) => this.props.updateLimitPerPage(value)

    // http://derpturkey.com/react-pass-value-with-onclick/
    // check the comment from user 'yetanotherjosh'
    handleEdit = (id) => (e) => (
      this.context.router.push(`/pokemons/page${this.props.params.page}/pokemon/${id}`)
    )

    render () {
      return (
        <WrappedComponent
          {...this.props}
          showIDs={this.state.showIDs}
          onShowIDsToggle={this.onShowIDsToggle}
          handleEdit={this.handleEdit}
          handleLimitChange={this.handleLimitChange}
          currentPage={this.props.params.page}
        />
      )
    }
  }

  const mapStateToProps = ({ pokemonsStore: {pokemons, limit, count, error} }) => ({ pokemons, limit, count, error })

  const mapDispatchToProps = (dispatch) => ({
    fetchAllPokemonsPaginated: (limit, offset) => dispatch(fetchAllPokemonsPaginated(limit, offset)),
    updateLimitPerPage: (limit) => dispatch(updateLimitPerPage(limit))
  })

  return connect(mapStateToProps, mapDispatchToProps)(ListContainer)
}
