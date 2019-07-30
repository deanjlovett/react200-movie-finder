const axios = require('axios');

export const updateSearch = title => ({
  type: 'UPDATE_SEARCH_INPUT',
  payload: title
});

export const getMovie = title => ({
  type: 'GET_MOVIE',
  payload: axios.get(`/movies/${title}`)
});

export const getInfo = id => ({
  type: 'GET_INFO',
  payload: axios.get(`/movie/${id}`)
});
