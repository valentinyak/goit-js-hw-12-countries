import fetchCountries from './fetch-countries';
import debounce from 'lodash.debounce';
import createNotificationError from './create-notification-error';
import listTemplate from './list-template.hbs';
import countryTemplate from './country-template.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import './common.css';

const inputEl = document.querySelector('input');
inputEl.addEventListener('input', debounce(getContriesFromInput, 500));

function getContriesFromInput() {
  const serchQuery = fetchCountries(inputEl.value);

  serchQuery
    .then(data => {
      return findSerchResaltLength(data);
    })
    .then(markup => {
      if (markup !== undefined) {
        createMarkup(markup);
      }
    })
    .catch(error => console.log(error));
}

function findSerchResaltLength(array) {
  clearMarkup();

  if (array.status === 404) {
    return;
  }

  if (array.length > 10) {
    createNotificationError();
  } else if (array.length > 1 && array.length < 10) {
    return listTemplate(array);
  } else {
    return countryTemplate(array);
  }
}

function createMarkup(markup) {
  inputEl.insertAdjacentHTML('afterend', markup);
}

function clearMarkup() {
  const refs = {
    countryListEl: document.querySelector('ul.counry-list'),
    countryArticleEl: document.querySelector('div.country-article'),
  };

  if (refs.countryListEl) {
    refs.countryListEl.remove();
  }

  if (refs.countryArticleEl) {
    refs.countryArticleEl.remove();
  }
}
