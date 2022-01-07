import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './js/fetchCountries.js';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', Debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = refs.input.value.trim();
  if (!name) {
    return (list.innerHTML = '', info.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
      refs.list.innerHTML = ''
      refs.info.innerHTML = ''

      if (countries.length > 10) {
        tooManyMatches();
      }
      else if (countries.length >= 2 && countries.length < 10) {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries))
      }
      else {
        refs.list.insertAdjacentHTML('beforeend', renderList(countries))
        refs.info.insertAdjacentHTML('beforeend', renderInfo(countries))
      }
    })
    .catch(wrongName)
}

function renderList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px >
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup
}

function renderInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
}

function wrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name')
}

function tooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
