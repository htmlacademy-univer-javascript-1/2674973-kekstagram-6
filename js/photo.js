import { DESCRIPTIONS, MESSAGES, NAMES } from './data.js';
import { getRandomInt, getRandomArrayElement } from './util.js';
const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});
const createPhoto = (id) => {
  const commentsCount = getRandomInt(0, 30);
  const comments = Array.from({length: commentsCount}, (_, i) => createComment(i + 1));
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: comments
  };
};
export const generatePhotos = () =>
  Array.from({length: 25}, (_, i) => createPhoto(i + 1));
