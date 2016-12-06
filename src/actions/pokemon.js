export const actions = {
  POKEMON_UPDATE_LIMITPERPAGE: 'POKEMON_UPDATE_LIMITPERPAGE',
  POKEMON_FETCH: 'POKEMON_FETCH',
  POKEMON_FETCH_ERROR: 'POKEMON_FETCH_ERROR'
}

const API_URL = 'http://pokeapi.co/api/v2'

/* Only fetch the first [limit] items to reduce rendering delay and enhance UX */
export const fetchPokemon = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/pokemon/${id}`).then(r => r.json())
      const { name, stats, types, height, weight, sprites: {front_default: sprite}, species: {name: specie}, base_experience } = response
      dispatch({
        type: actions.POKEMON_FETCH,
        name, stats, types, height, weight, sprite, specie, base_experience // eslint-disable-line
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
