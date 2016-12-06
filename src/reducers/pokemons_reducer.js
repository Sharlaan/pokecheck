import { actions } from '../actions/pokemons'

const INITIAL_STATE = {
  limit: 20,
  count: 0,
  pokemons: [],
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.POKEMONS_UPDATE_LIMITPERPAGE:
      return { ...state, limit: action.limit }

    case actions.POKEMONS_PAGINATED_FETCH:
      const { type, ...rest } = action // eslint-disable-line
      /* completing each pokemon with its id extracted from url,
         and sprite url (front_default) formatted as
         https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png */
      for (let p of rest.pokemons) {
        // extract id from url
        let id = p.url.slice(p.url.lastIndexOf('/', p.url.length - 2)).replace(/\//g, '')
        p.id = parseInt(id, 10)
        p.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      }
      return { ...state, ...rest }

    case actions.POKEMONS_PAGINATED_FETCH_ERROR:
      return { ...state,
        loading: false,
        error: action.error
      }

    default: return state
  }
}
