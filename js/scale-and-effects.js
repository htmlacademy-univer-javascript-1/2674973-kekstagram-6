// ---------- ЭЛЕМЕНТЫ ----------
const imgPreview = document.querySelector('.img-upload__preview img');

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const effectRadios = document.querySelectorAll('.effects__radio');
const effectValueInput = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');


// ---------- МАСШТАБ ----------
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

// Обновление масштаба
function applyScale(value) {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
}

// Обработчик "уменьшить"
smallerButton.addEventListener('click', () => {
  let current = parseInt(scaleInput.value, 10);
  if (current > SCALE_MIN) {
    current -= SCALE_STEP;
    applyScale(current);
  }
});

// Обработчик "увеличить"
biggerButton.addEventListener('click', () => {
  let current = parseInt(scaleInput.value, 10);
  if (current < SCALE_MAX) {
    current += SCALE_STEP;
    applyScale(current);
  }
});


// ---------- ЭФФЕКТЫ ----------
const EFFECTS = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    unit: '',
    filter: () => ''
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    unit: '',
    filter: (v) => `grayscale(${v})`
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    unit: '',
    filter: (v) => `sepia(${v})`
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    unit: '%',
    filter: (v) => `invert(${v}%)`
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    unit: 'px',
    filter: (v) => `blur(${v}px)`
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    unit: '',
    filter: (v) => `brightness(${v})`
  }
};


// ---------- ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ----------
noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

// Применение значения слайдера
slider.noUiSlider.on('update', (values) => {
  const value = values[0];
  effectValueInput.value = value;

  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  const effect = EFFECTS[selectedEffect];

  imgPreview.style.filter = effect.filter(value);
});


// ---------- ПЕРЕКЛЮЧЕНИЕ ФИЛЬТРОВ ----------
effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effectName = radio.value;
    const effect = EFFECTS[effectName];

    // сбрасываем старый эффект
    imgPreview.style.filter = 'no
