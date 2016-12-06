export const actions = {
  POKEMONS_UPDATE_LIMITPERPAGE: 'POKEMONS_UPDATE_LIMITPERPAGE',
  POKEMONS_PAGINATED_FETCH: 'POKEMONS_PAGINATED_FETCH',
  POKEMONS_PAGINATED_FETCH_ERROR: 'POKEMONS_FETCH_ERROR'
}

const API_URL = 'http://pokeapi.co/api/v2'

/* Only fetch the first [limit] items to reduce rendering delay and enhance UX */
export const fetchAllPokemonsPaginated = (limit, offset = 0) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/?limit=${limit}&offset=${offset}`).then(r => r.json())
      dispatch({
        type: actions.POKEMONS_PAGINATED_FETCH,
        count: response.count,
        pokemons: response.results,
        limit
      })
    } catch (error) {
      console.debug('error', error)
      dispatch({
        type: actions.POKEMONS_PAGINATED_FETCH_ERROR,
        error
      })
    }
  }
}

export const updateLimitPerPage = (limit) => {
  return { type: actions.POKEMONS_UPDATE_LIMITPERPAGE, limit }
}
