import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import createNotificationError from './createNotificationError';
import listTemplate from './listTemplate.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import './common.css';

const refs = {
  inputEl: document.querySelector('input'),
};

refs.inputEl.addEventListener('input', debounce(getContriesFromInput, 500));

function getContriesFromInput() {
  const serchQuery = fetchCountries(refs.inputEl.value);
  // serchQuery.then(data => findSerchResaltLength(data));
  // listTemplate(serchQuery);
  serchQuery
    .then(data => {
      return listTemplate(data);
    })
    .then(console.log);
}

function findSerchResaltLength(array) {
  if (array.length > 10) {
    createNotificationError();
  } else if (array.length > 1 && array.length < 10) {
    listTemplate(array);
  }
}
