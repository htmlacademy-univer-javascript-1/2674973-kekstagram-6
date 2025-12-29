const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const renderPictures = (data) => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  data.forEach(({ id, url, description, likes, comments }) => {
    const element = pictureTemplate.cloneNode(true);
    element.dataset.id = id;
    const img = element.querySelector('.picture__img');
    img.src = url;
    img.alt = description;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(element);
  });
  picturesContainer.appendChild(fragment);
};
export { renderPictures };
