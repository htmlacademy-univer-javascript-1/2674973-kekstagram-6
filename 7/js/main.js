import { generatePhotos } from './photo.js';
import { renderPictures } from './pictures.js';
import { initBigPicture } from './big-picture.js';
import { photos } from './data.js';

// 1. отрисовали миниатюры
renderPictures(photos);

// 2. нашли их в DOM
const thumbnails = document.querySelectorAll('.picture');

// 3. подключили полноразмерный просмотр
initBigPicture(thumbnails, photos);

const photos = generatePhotos();

console.log(photos);
