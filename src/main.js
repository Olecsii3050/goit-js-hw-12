import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, showLoader, hideLoader } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  currentQuery = query;
  currentPage = 1;
  loadMoreBtn.style.display = 'none';

  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();
    renderImages(images, false);
    if (images.length > 0) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  } finally {
    searchInput.value = '';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();
    if (images.length > 0) {
      renderImages(images, true);
      const galleryItems = document.querySelectorAll('.gallery li');
      const itemHeight = galleryItems[0].getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2,
        behavior: 'smooth',
      });
    } else {
      loadMoreBtn.style.display = 'none';
      showMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  }
});
