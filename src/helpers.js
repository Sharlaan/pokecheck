
/* sprite url (front_default) formatted as
 https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png
 UPDATE: found nicer pictures from official site pokemon.com */
export const getSpritesCDNurl = (id) => {
  const baseUrl = 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
  // Number of zeros to concatenate with id, to form a 3-length formatted id for sprite url
  const nb = `${id}`.length >= 3 ? 0 : (3 - `${id}`.length)
  return baseUrl + '0'.repeat(nb) + id + '.png'
}
