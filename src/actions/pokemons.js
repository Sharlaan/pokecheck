export const actions = {
  POKEMONS_UPDATE_LIMITPERPAGE: 'POKEMONS_UPDATE_LIMITPERPAGE',
  POKEMONS_FETCH_ERROR: 'POKEMONS_FETCH_ERROR',
  POKEMONS_FETCH: 'POKEMONS_FETCH',
  POKEMONS_PAGINATED_FETCH: 'POKEMONS_FETCH',
  POKEMONS_DETAILS_FETCH: 'POKEMONS_DETAILS_FETCH',
  POKEMONS_CALC_AVG: 'POKEMONS_CALC_AVG'
}

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'

// TODO: add cacheLimit to checkCacheThenFetch
// const cacheLimit = 1000000 * 1000 // 11 days

// used to prevent unnecessary calculation of averages
// if all urls were already in cache, then should use cached average
let reCalculateAverages = false

const fetchAndCache = (url) => {
  // eslint-disable-next-line
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({ 'Content-Type': 'application/json' })
  }
  return fetch(url)
    .then(response => {
      if (response.ok) {
        caches.open('pokemons/v2')
          .then(cache => cache.put(url, response))
        console.debug(`Fetched and cached ${url}`)
        reCalculateAverages = true
        return response.clone()
      } else throw new Error(response.statusText)
    })
    .then(r => r.json())
    .catch(error => console.error(error + ' with fetching ' + url))
}

const checkCacheThenFetch = (request) => {
  return caches.open('pokemons/v2')
    .then(cache => cache.match(request))
    .then(response => {
      if (response) {
        console.debug(`Getting response from Cache for request ${request}`)
        return response.json()
      } else return fetchAndCache(request)
    })
    .catch(error => console.error(`No match found in cache for ${request}`, error))
}

const getPokemonDetails = async (dispatch, listIDs, start, end) => {
  const FullPokemons = listIDs.slice(start, end).map(async id => {
    const pokemon = await checkCacheThenFetch(`${API_URL}${id}/`)
    pokemon.id = id
    return pokemon
  })
  // dispatch them to the pokemonsStore sequentially
  for (let p of FullPokemons) {
    const { id, name, stats, types, height, weight, species: {name: specie}, base_experience } = await p
    dispatch({
      type: actions.POKEMONS_DETAILS_FETCH,
      details: { id, name, stats, types, height, weight, specie, base_experience }
    })
  }
}

/* Tests showed this global fetch actually takes about less than 3secs
 * so ill first fetch the 20 first entries (default limit = 20)
 * then i'll fetch the rest from offset = 21 and limit = response.count */
export const fetchAllPokemons = (limit) => {
  return (dispatch) => {
    performance.mark('fetchAllPokemons1')
    checkCacheThenFetch(API_URL) // get total count to use as limit in 2nd fetch
      .catch(error => {
        console.debug('error1', error)
        dispatch({
          type: actions.POKEMONS_FETCH_ERROR,
          error: error.message
        })
      })
      .then(({ count, results }) => {
        performance.mark('fetchAllPokemons2')
        checkCacheThenFetch(`${API_URL}?limit=${count}&offset=${21}`)
          .then(response => {
            performance.mark('fetchAllPokemons3')
            const pokemons = results.concat(response.results).map(p => {
              const id = p.url.slice(p.url.lastIndexOf('/', p.url.length - 2)).replace(/\//g, '')
              return { id: +id, name: p.name }
            })
            // dispatches array of formatted pokemons
            console.debug('dispatching pokemon names list')
            dispatch({
              type: actions.POKEMONS_FETCH,
              pokemons,
              count
            })

            performance.mark('getPokemonDetails1')

            // then continues with fetching each pokemons' details
            console.debug('fetching details')
            const listIDs = pokemons.map(p => p.id)
            // fetch only first [limit] x URLs in parallel so user get them available in current page
            getPokemonDetails(dispatch, listIDs, 0, 0 + limit + 1)
              .then(() => {
                // fetch next URLs in parallel so can calculate averages
                performance.mark('getPokemonDetails2')
                getPokemonDetails(dispatch, listIDs, 0 + limit + 1)
                  .then(() => {
                    performance.mark('getPokemonDetails3')
                    // Once all details dispatched, call calculateAverages
                    dispatch({ type: actions.POKEMONS_CALC_AVG, reCalculateAverages })
                    reCalculateAverages = false
                  })
                  .catch(error => console.debug('Error with 2nd getPokemonDetails', error))
              })
              .catch(error => console.debug('Error with 1st getPokemonDetails', error))
          })
      })
  }
}

export const updateLimitPerPage = (limit) => {
  return { type: actions.POKEMONS_UPDATE_LIMITPERPAGE, limit }
}
