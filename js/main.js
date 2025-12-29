import { initBigPicture } from './big-picture.js';
import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { showDataError } from './message.js';
import { setFormSubmit } from './form.js';
import './scale-and-effects.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    const thumbnails = document.querySelectorAll('.picture');
    initBigPicture(thumbnails, photos);
  })
  .catch((err) => {
    showDataError(err.message);
  });

setFormSubmit();
