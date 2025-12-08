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


// --- ОТКРЫТИЕ ОКНА ---
function openBigPicture(photo) {
  // показать окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // спрятать блоки загрузки комментов
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // подставить данные
  bigImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  // очистить старые комментарии
  commentsList.innerHTML = '';

  // отрисовать новые комментарии
  photo.comments.forEach(({ avatar, name, message }) => {
    const comment = commentTemplate.cloneNode(true);
    const img = comment.querySelector('.social__picture');
    const text = comment.querySelector('.social__text');

    img.src = avatar;
    img.alt = name;
    text.textContent = message;

    commentsList.appendChild(comment);
  });

  // обработчик esc
  document.addEventListener('keydown', onEscKeyDown);
}


// --- ЗАКРЫТИЕ ОКНА ---
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// обработчик закрытия по крестику
closeButton.addEventListener('click', closeBigPicture);


// --- ПРИВЯЗКА К МИНИАТЮРАМ ---
function initBigPicture(thumbnails, photosData) {
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', () => {
      openBigPicture(photosData[i]);
    });
  });
}

export { initBigPicture };
