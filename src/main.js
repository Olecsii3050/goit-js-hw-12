/* import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  showLoader();
  fetchImages(query, (error, images) => {
    hideLoader();

    if (error) {
      console.error('Error fetching images:', error);
      showMessage('Failed to fetch images. Please try again later.');
      return;
    }

    renderImages(images);
  });
}); */
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoader, hideLoader } from './js/render-functions.js';

let currentPage = 1; // Додано
let currentQuery = ''; // Додано

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  currentQuery = query; // Зберігаємо запит
  currentPage = 1; // Скидаємо сторінку
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку

  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();
    renderImages(images);
    if (images.length > 0) {
      loadMoreBtn.style.display = 'block'; // Показуємо кнопку, якщо є зображення
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  }
});

// Додано обробник події для кнопки "Load more"
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1; // Збільшуємо номер сторінки
  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();
    if (images.length > 0) {
      renderImages(images);
      const galleryItems = document.querySelectorAll('.gallery li');
      const itemHeight = galleryItems[0].getBoundingClientRect().height; // Отримуємо висоту картки
      window.scrollBy({
        top: itemHeight * 2, // Прокручуємо на дві висоти картки
        behavior: 'smooth',
      });
    } else {
      loadMoreBtn.style.display = 'none'; // Сховати кнопку, якщо немає більше зображень
      showMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  }
});
