import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import config from "config";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  genresMap: {},
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${config.application.tmdb.baseUrl}/genre/movie/list?api_key=${config.application.tmdb.apiKey}`
  );
  return genres;
});

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, store) => {
    const {
      netflix: { genresMap },
    } = store.getState();
    const data = await getRawData(
      `${config.application.tmdb.baseUrl}/trending/${type}/week?api_key=${config.application.tmdb.apiKey}`,
      genresMap,
      true
    );
    return data;
  }
);

export const fetchByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, store) => {
    const {
      netflix: { genresMap },
    } = store.getState();
    const data = await getRawData(
      `${config.application.tmdb.baseUrl}/discover/${type}?api_key=${config.application.tmdb.apiKey}&with_genres=${genre}`,
      genresMap,
      false,
      type
    );
    return data;
  }
);

const getRawData = async (api, genresMap, paging, type) => {
  const movies = [];
  for (let i = 1; movies.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrarFromRawData(results, movies, genresMap, type);
  }
  return movies;
};

const createArrarFromRawData = (results, movies, genresMap, type) => {
  results.forEach((movie) => {
    const movieGeneres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genresMap[genre];
      if (name) movieGeneres.push(name);
    });
    if (movie.backdrop_path) {
      movies.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        type: movie.media_type || type,
        description: movie.overview,
        image: movie.backdrop_path,
        genres: movieGeneres.slice(0, 3),
      });
    }
  });
};

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      const genresMap = {};
      action.payload.forEach(({ id, name }) => {
        genresMap[id] = name;
      });
      state.genresMap = genresMap;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});

export default store;
