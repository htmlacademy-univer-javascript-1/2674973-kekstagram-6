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
const renderComments = () => {
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
  commentCountBlock.textContent = `${shownComments} из ${currentComments.length} комментариев`;
  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPress);
}

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderComments);

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  commentsList.innerHTML = '';
  currentComments = photo.comments;
  shownComments = 0;
  renderComments();
  document.addEventListener('keydown', onEscPress);
};

const picturesContainer = document.querySelector('.pictures');

const initBigPicture = (photosData) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const pictureId = Number(thumbnail.dataset.id);
    const pictureData = photosData.find((photo) => photo.id === pictureId);
    openBigPicture(pictureData);
  });
};
export { initBigPicture };
