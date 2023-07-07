import axios from 'axios';

const API_KEY = '36709978-7836bf9f35f408a7db18834e6';

export const fetchImages = (searchQuery, page) => {
  const url = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(url).then((response) => response.data.hits);
};
