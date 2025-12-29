const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const renderPictures = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({ url, description, likes, comments }) => {
    const element = pictureTemplate.cloneNode(true);
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
