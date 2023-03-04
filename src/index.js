import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();
  if (!searchQuery) {
    clearAll();
    return;
  }

  API.fetchCountries(searchQuery)
    .then(country => {
      clearAll();

      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length === 1) {
        renderCountryInfo(country);
      } else {
        renderCountryList(country);
      }
    })
    .catch(error => {
      clearAll();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryList(сountriesName) {
  const markup = сountriesName
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name.official}" width="40" height="30">
              <h2 class="country-list__item--name">${name.official}</h2>
          </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountryInfo(сountriesName) {
  const markup = сountriesName
    .map(({ name, flags, capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item">
              <img class="country-info__item--flag" src="${
                flags.svg
              }" alt="Flag of ${name.official}" width="40" height="30">
              <h2 class="country-info__item--name">${name.official}</h2>
            </li>
            <li class="country-info__item"><span>Capital: </span>${capital}</li>
            <li class="country-info__item"><span>Population: </span>${population}</li>
            <li class="country-info__item"><span>Languages: </span>${Object.values(
              languages
            ).join(', ')}</li>
        </ul>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function clearAll() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
