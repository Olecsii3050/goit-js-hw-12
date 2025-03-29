import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showLoader,
  hideLoader,
  showMessage,
  clearGallery,
} from './js/render-functions.js';

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
  clearGallery();

  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);

    if (images.length === 0) {
      showMessage('No images found. Please try a different query.');
      return;
    }

    renderImages(images, false);
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  } finally {
    hideLoader();
    searchInput.value = '';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loadMoreBtn.style.display = 'none';
  showLoader();
  try {
    const images = await fetchImages(currentQuery, currentPage);

    if (images.length > 0) {
      renderImages(images, true);
      loadMoreBtn.style.display = 'block';
    } else {
      showMessage("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    showMessage('Failed to fetch images. Please try again later.');
  } finally {
    hideLoader();
  }
});
