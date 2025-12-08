import { generatePhotos } from './photo.js';
import { initBigPicture } from './big-picture.js';
import { photos } from './data.js';
const photos = generatePhotos();
renderPictures(photos);
const thumbnails = document.querySelectorAll('.picture');
initBigPicture(thumbnails, photos)
console.log(photos);
