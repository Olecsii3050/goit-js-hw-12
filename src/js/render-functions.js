import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

let lightbox;

export const renderImages = (images, append = false) => {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    showMessage(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li>
            <a href="${largeImageURL}" class="gallery__item">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p>Likes: <span>${likes}</span></p>
                <p>Views: <span>${views}</span></p>
                <p>Comments: <span>${comments}</span></p>
                <p>Downloads: <span>${downloads}</span></p>
            </div>
        </li>
    `
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {});
  } else {
    lightbox.refresh();
  }
};

export const showLoader = () => {
  document.querySelector('.loader').style.display = 'block';
};

export const hideLoader = () => {
  document.querySelector('.loader').style.display = 'none';
};

export const showMessage = message => {
  iziToast.error({ title: 'Error', message, position: 'topRight' });
};

export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};
