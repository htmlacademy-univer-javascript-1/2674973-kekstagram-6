const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;

const closeButton = uploadOverlay.querySelector('.img-upload__cancel');

const hashtagInput = uploadOverlay.querySelector('.text__hashtags');
const commentInput = uploadOverlay.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

// ----------- ПРИСТИН -----------
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

// ----------- ВАЛИДАЦИЯ ХЭШТЕГОВ -----------

function validateHashtags(value) {
  if (value.trim() === '') return true;

  const rules = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  const tags = value.trim().toLowerCase().split(/\s+/);

  if (tags.length > 5) return false;

  const unique = new Set(tags);
  if (unique.size !== tags.length) return false;

  return tags.every(tag => rules.test(tag));
}

pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштега');

// ----------- ВАЛИДАЦИЯ КОММЕНТАРИЯ -----------

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(commentInput, validateComment, 'Комментарий не может быть длиннее 140 символов');

// ----------- ОТКРЫТЬ ФОРМУ -----------

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

// ----------- ЗАКРЫТЬ ФОРМУ -----------

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();            // очистить текст полей
  uploadInput.value = '';  // сбросить файл!
}

closeButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeForm();
  }
});

// ----------- ОТПРАВКА ФОРМЫ -----------

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
