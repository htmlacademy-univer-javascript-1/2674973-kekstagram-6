const bigPicture = document.querySelector('.big-picture');
const bigImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');
const caption = bigPicture.querySelector('.social__caption');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

const COMMENTS_STEP = 5;

let currentComments = [];
let shownComments = 0;


// ----------------------
//  РЕНДЕР КОММЕНТАРИЕВ
// ----------------------
function renderComments() {
  const fragment = document.createDocumentFragment();

  const nextPart = currentComments.slice(shownComments, shownComments + COMMENTS_STEP);

  nextPart.forEach(({ avatar, name, message }) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.appendChild(comment);
  });

  commentsList.appendChild(fragment);

  shownComments += nextPart.length;

  // обновляем счётчик
  commentCountBlock.textContent = `${shownComments} из ${currentComments.length} комментариев`;

  // если комментарии закончились — скрываем кнопку
  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
}


// ----------------------
//  ОТКРЫТИЕ ОКНА
// ----------------------
function openBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  // показываем панели
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // чистим старые комментарии
  commentsList.innerHTML = '';

  // загружаем новые комментарии
  currentComments = photo.comments;
  shownComments = 0;

  renderComments();

  document.addEventListener('keydown', onEscPress);
}


// ----------------------
//  ЗАКРЫТИЕ ОКНА
// ----------------------
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderComments);


// ----------------------
// СВЯЗЬ МИНИАТЮР С ОКНОМ
// ----------------------
function initBigPicture(thumbnails, photosData) {
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', () => {
      openBigPicture(photosData[i]);
    });
  });
}

export { initBigPicture };
