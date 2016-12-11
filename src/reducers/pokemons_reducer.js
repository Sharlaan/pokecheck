import { actions } from '../actions/pokemons'

const INITIAL_STATE = {
  limit: 20,
  count: 0,
  pokemons: [],
  pokemonsDetails: [],
  averages: [],
  error: null
}

/* Extending each pokemon with its id (extracted from url),
 and removing unnecessary properties url */
const extended = (data) => data.map(p => {
  const id = p.url.slice(p.url.lastIndexOf('/', p.url.length - 2)).replace(/\//g, '')
  return { id: +id, name: p.name }
})

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.POKEMONS_UPDATE_LIMITPERPAGE:
      return { ...state, limit: action.limit }

    case actions.POKEMONS_FETCH:
      const pokemons = extended(action.pokemons)
      return { ...state, count: action.count, pokemons }

    case actions.POKEMONS_DETAILS_FETCH: {
      const ad = action.details
      // convert ArrayOf(objects) into Object (flattenization)
      ad.stats = ad.stats.reduce((obj, {stat: {name}, base_stat: baseStat}) => {
        obj[name] = baseStat
        return obj
      }, {})
      ad.types = ad.types.map(type => type.type.name)
      ad.baseExperience = ad.base_experience
      delete ad.base_experience
      const pokemonsDetails = [ ...state.pokemonsDetails ] // copying to avoid mutation of state
      let pk = pokemonsDetails.find(p => p.id === ad.id)
      if (!pk) pokemonsDetails.push(ad)
      else pk = { ...pk, ...ad }
      // console.debug('Pokemon details pulled to Store !', pokemons.find(p => p.id === ad.id))
      return { ...state, pokemonsDetails }
    }

    case actions.POKEMONS_CALC_AVG: {
      let averages = []
      console.debug('reCalculateAverages', action.reCalculateAverages)
      const test = localStorage.getItem('pokemons/v2/averages') || false
      if (test && !action.reCalculateAverages) averages = JSON.parse(test)
      else {
        averages = [ ...state.averages ]
        const pokemonsDetails = [ ...state.pokemonsDetails ]
        const dividers = {} // nb of pokemons for a given type, used for calculating average
        for (let pok of pokemonsDetails) {
          for (let tp of pok.types) {
            if (!dividers[ tp ]) dividers[ tp ] = 0
            ++dividers[ tp ]
            let avgType = averages.find(a => a.type === tp)
            if (!avgType) {
              avgType = { type: tp, averages: {} }
              averages.push(avgType)
            }
            for (let st of Object.getOwnPropertyNames(pok.stats)) {
              avgType.averages[ st ] = (avgType.averages[ st ] || 0) + +pok.stats[ st ]
            }
          }
        }
        for (let avg of averages) {
          for (let st of Object.getOwnPropertyNames(avg.averages)) {
            if (dividers[ avg.type ] !== 0) avg.averages[ st ] /= dividers[ avg.type ]
          }
        }
        console.debug('averages', averages, '\nNumber of pokemons per type', dividers)
        localStorage.setItem('pokemons/v2/averages', JSON.stringify(averages))
        console.debug(`Averages cached !`)
      }
      performance.mark('calcAvg')
      if (averages.length) return { ...state, averages }
      break
    }

    case actions.POKEMONS_FETCH_ERROR:
      return { ...state,
        loading: false,
        error: action.error
      }

    default: return state
  }
}
