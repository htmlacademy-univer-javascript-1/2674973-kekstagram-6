import './form.js';
import { initBigPicture } from './big-picture.js';
import { renderPictures } from './pictures.js';
import { photos } from './data.js';
import './scale-and-effects.js';
renderPictures(photos);
const thumbnails = document.querySelectorAll('.picture');
initBigPicture(thumbnails, photos);
