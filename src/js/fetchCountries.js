// const BASE_URL = 'https://pokeapi.co/api/v2';

// function fetchPokemon(pokemonId) {
//   return fetch(`${BASE_URL}/pokemon/${pokemonId}`).then(response =>
//     response.json(),
//   );
// }

// export default { fetchPokemon };

const URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?${fields}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}
