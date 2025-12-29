const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;

const closeButton = uploadOverlay.querySelector('.img-upload__cancel');

const hashtagInput = uploadOverlay.querySelector('.text__hashtags');
const commentInput = uploadOverlay.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

function validateHashtags(value) {
  if (value.trim() === '') {return true;}
  const rules = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const tags = value.trim().toLowerCase().split(/\s+/);
  if (tags.length > 5) {return false;}
  const unique = new Set(tags);
  if (unique.size !== tags.length) {return false;}
  return tags.every((tag) => rules.test(tag));
}
pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштега');

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(commentInput, validateComment, 'Комментарий не может быть длиннее 140 символов');

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  pristine.reset();
  uploadInput.value = '';
}

closeButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      return;
    }
    closeForm();
  }
});

const submitButton = form.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    // Здесь будет отправка данных на сервер
    // После получения ответа нужно вызвать unblockSubmitButton()
    // Пока просто имитируем задержку для демонстрации
    setTimeout(() => {
      unblockSubmitButton();
      closeForm();
    }, 2000);
  }
});
