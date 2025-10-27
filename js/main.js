const DESCRIPTIONS = [
  'Красивый закат 🌅',
  'Отдыхаем у моря 🏖',
  'Вкусный завтрак 🍳',
  'Лучший день!',
  'Моя любимая собака 🐶'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках — у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Иван', 'София', 'Андрей', 'Елена'];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) =>
  array[getRandomInt(0, array.length - 1)];

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

const photos = Array.from({length: 25}, (_, i) => createPhoto(i + 1));

console.log(photos);
