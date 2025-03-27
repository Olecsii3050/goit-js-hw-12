const API_KEY = '49366841-2722787d336af87d57ebdc2bd';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch images.');
  }
  return response.data.hits;
};
