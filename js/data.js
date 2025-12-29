import { getRandomInt, getRandomArrayElement } from './util.js';
export const DESCRIPTIONS = [
  'Красивый закат 🌅',
  'Отдыхаем у моря 🏖',
  'Вкусный завтрак 🍳',
  'Лучший день!',
  'Моя любимая собака 🐶'
];
export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках — у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены. Как можно было поймать такой неудачный момент?!'
];
export const NAMES = ['Артём', 'Мария', 'Иван', 'София', 'Андрей', 'Елена'];
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});
const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({ length: getRandomInt(0, 30) }, (_, index) => createComment(index + 1)),
});
export const photos = Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));
