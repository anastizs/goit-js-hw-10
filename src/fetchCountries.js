const BASE_URL = 'https://restcountries.com/v3.1';
const opthions = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${opthions}`).then(response => {
    return response.json();
  });
}

export default { fetchCountries };
