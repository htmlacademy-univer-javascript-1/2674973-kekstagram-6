const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function showMessage(template, closeButtonClass) {
  const element = template.cloneNode(true);
  element.style.zIndex = '100';
  document.body.append(element);

  const closeButton = element.querySelector(closeButtonClass);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === element) {
      close();
    }
  };

  function close() {
    element.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
}

export const showSuccessMessage = () => showMessage(successTemplate, '.success__button');
export const showErrorMessage = () => showMessage(errorTemplate, '.error__button');

const REMOVE_MESSAGE_TIMEOUT = 5000;

export const showDataError = (message) => {
  const errorElement = document.createElement('div');
  errorElement.classList.add('data-error');
  errorElement.textContent = message;

  errorElement.style.position = 'fixed';
  errorElement.style.top = '0';
  errorElement.style.left = '0';
  errorElement.style.width = '100%';
  errorElement.style.height = '50px';
  errorElement.style.backgroundColor = '#ff4e4e';
  errorElement.style.color = '#fff';
  errorElement.style.textAlign = 'center';
  errorElement.style.lineHeight = '50px';
  errorElement.style.zIndex = '100';

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};
