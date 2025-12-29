import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

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

const validateHashtags = (value) => {
  if (value.trim() === '') {return true;}
  const rules = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const tags = value.trim().toLowerCase().split(/\s+/);
  if (tags.length > 5) {return false;}
  const unique = new Set(tags);
  if (unique.size !== tags.length) {return false;}
  return tags.every((tag) => rules.test(tag));
};
pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштега');

const validateComment = (value) => value.length <= 140;

pristine.addValidator(commentInput, validateComment, 'Комментарий не может быть длиннее 140 символов');

uploadInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

import { resetScale, resetEffects } from './scale-and-effects.js';

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadInput.value = '';
};

closeButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const isErrorVisible = document.querySelector('.error');
    if (document.activeElement === hashtagInput || document.activeElement === commentInput || isErrorVisible) {
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

export const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessMessage();
          closeForm();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};
