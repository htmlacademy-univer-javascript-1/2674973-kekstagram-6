const imgPreview = document.querySelector('.img-upload__preview img');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectValueInput = document.querySelector('.effect-level__value');
const slider = document.querySelector('.effect-level__slider');
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
function applyScale(value) {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
}
smallerButton.addEventListener('click', () => {
  let current = parseInt(scaleInput.value, 10);
  if (current > SCALE_MIN) {
    current -= SCALE_STEP;
    applyScale(current);
  }
});
biggerButton.addEventListener('click', () => {
  let current = parseInt(scaleInput.value, 10);
  if (current < SCALE_MAX) {
    current += SCALE_STEP;
    applyScale(current);
  }
});
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
noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
slider.noUiSlider.on('update', (values) => {
  const value = values[0];
  effectValueInput.value = value;
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  const effect = EFFECTS[selectedEffect];
  imgPreview.style.filter = effect.filter(value);
});
effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effectName = radio.value;
    const effect = EFFECTS[effectName];
    imgPreview.style.filter = 'none';
    slider.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step
    });
    effectValueInput.value = effect.start;
    if (effectName === 'none') {
      slider.parentElement.style.display = 'none';
    } else {
      slider.parentElement.style.display = 'block';
    }
    imgPreview.style.filter = effect.filter(effect.start);
  });
});
slider.parentElement.style.display = 'none';
applyScale(100);
