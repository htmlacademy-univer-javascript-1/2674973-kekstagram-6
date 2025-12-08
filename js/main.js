import { generatePhotos } from './photo.js';
import { renderPictures } from './pictures.js';
import { photos } from './data.js';

renderPictures(photos);

const photos = generatePhotos();

console.log(photos);
