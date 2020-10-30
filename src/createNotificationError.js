import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import { error } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';

export default function createNotificatioError() {
  const myError = error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '250px',
    delay: 3000,
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
}
