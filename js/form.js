import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const body = document.body;
let currentObjectUrl;

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
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
    }
    currentObjectUrl = URL.createObjectURL(file);
    preview.src = currentObjectUrl;
    effectsPreviews.forEach((effect) => {
      effect.style.backgroundImage = `url('${currentObjectUrl}')`;
    });
  }
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
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
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
