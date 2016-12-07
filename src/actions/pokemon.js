export const actions = {
  POKEMON_UPDATE_LIMITPERPAGE: 'POKEMON_UPDATE_LIMITPERPAGE',
  POKEMON_FETCH: 'POKEMON_FETCH',
  POKEMON_FETCH_ERROR: 'POKEMON_FETCH_ERROR',
  POKEMON_CLEAR: 'POKEMON_CLEAR'
}

const API_URL = 'http://pokeapi.co/api/v2'

/* Only fetch the first [limit] items to reduce rendering delay and enhance UX */
export const fetchPokemon = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/${id}`).then(r => r.json())
      const { name, stats, types, height, weight, species: {name: specie}, base_experience } = response
      dispatch({
        type: actions.POKEMON_FETCH,
        id, name, stats, types, height, weight, specie, base_experience // eslint-disable-line
      })
    } catch (error) {
      console.debug('error', error)
      dispatch({
        type: actions.POKEMON_FETCH_ERROR,
        error
      })
    }
  }
}

export const clearPokemonStore = () => ({ type: actions.POKEMON_CLEAR })
