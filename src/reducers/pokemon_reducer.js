import { actions } from '../actions/pokemon'

const INITIAL_STATE = {
  name: '',
  stats: [],
  types: [],
  height: 0,
  weight: 0,
  sprite: '',
  specie: '',
  baseExperience: 0,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.POKEMON_UPDATE_LIMITPERPAGE:
      return { ...state, limit: action.limit }

    case actions.POKEMON_FETCH:
      const { type, ...rest } = action // eslint-disable-line
      rest.stats = rest.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
      rest.types = rest.types.map(type => type.type.name)
      rest.baseExperience = rest.base_experience
      delete rest.base_experience
      return { ...state, ...rest }

    case actions.POKEMON_FETCH_ERROR:
      return { ...state,
        loading: false,
        error: action.error
      }

    case actions.POKEMON_CLEAR:
      return INITIAL_STATE

    default: return state
  }
}
