import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const MAX_RANDOM_FILTER = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => [...data].sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_FILTER),
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const setActiveButton = (clickedButton) => {
  const activeButton = filterForm.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
};

export const initFilters = (data, callback) => {
  filtersElement.classList.remove('img-filters--inactive');
  const debouncedCallback = debounce(callback);

  const onFilterClick = (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      setActiveButton(evt.target);
      const filter = evt.target.id.replace('filter-', '');
      const filteredData = filterHandlers[filter](data);
      debouncedCallback(filteredData);
    }
  };

  filterForm.addEventListener('click', onFilterClick);
};
