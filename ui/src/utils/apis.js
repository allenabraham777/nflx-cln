import config from "config";
import axios from "axios";

export const getGenres = () =>
  axios.get(
    `${config.application.tmdb.baseUrl}/genre/movie/list?api_key=${config.application.tmdb.apiKey}`
  );

function sendMovieRequest(paging, page) {
  if (!this.api) return [];
  return axios.get(`${this.api}${paging ? `&page=${page}` : ""}`);
}

export const getTrendingMovies = (type) => {
  const api = `${config.application.tmdb.baseUrl}/trending/${type}/week?api_key=${config.application.tmdb.apiKey}`;
  return sendMovieRequest.bind({ api });
};

export const getMoviesByGenre = (type, genre) => {
  const api = `${config.application.tmdb.baseUrl}/discover/${type}?api_key=${config.application.tmdb.apiKey}&with_genres=${genre}`;
  return sendMovieRequest.bind({ api });
};

export const getCoverImage = (movieId, type) => {
  const api = config.application.tmdb.titleImagesUrl(movieId, type);
  return axios.get(api);
};

export const getVideo = (movieId, type) => {
  const api = config.application.tmdb.videosUrl(movieId, type);
  return axios.get(api);
};

export default {
  getGenres,
  getTrendingMovies,
  getMoviesByGenre,
  getCoverImage,
  getVideo,
};
