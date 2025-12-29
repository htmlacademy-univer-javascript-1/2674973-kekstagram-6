import { initBigPicture } from './big-picture.js';
import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { showDataError } from './message.js';
import { setFormSubmit } from './form.js';
import { initFilters } from './filters.js';
import './scale-and-effects.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos, renderPictures);
    initBigPicture(photos);
  })
  .catch((err) => {
    showDataError(err.message);
  });

setFormSubmit();
