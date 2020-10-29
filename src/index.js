import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import { error } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';

import '@pnotify/core/dist/BrightTheme.css';
import './common.css';

const refs = {
  inputEl: document.querySelector('input'),
};

refs.inputEl.addEventListener('input', debounce(getContriesFromInput, 500));

function getContriesFromInput() {
  fetchCountries(refs.inputEl.value);
}

setTimeout(() => {
  const myError = error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '250px',
    delay: 150000,
    closer: false,
    sticker: false,
    modules: new Map([
      ...defaultModules,
      [
        PNotifyAnimate,
        {
          inClass: 'animate__animated animate__backOutDown',
          outClass: 'animate__animated animate__backOutUp',
        },
      ],
    ]),
  });

  const errorRefs = {
    errorEl: document.querySelector('div.brighttheme-container'),
    errorContentEl: document.querySelector('div.brighttheme-content'),
  };

  errorRefs.errorEl.style.display = 'flex';
  errorRefs.errorContentEl.style.marginLeft = '5px';
}, 2000);
