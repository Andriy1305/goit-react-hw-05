// services/tmdbApi.js
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmVlZTQ2YmQzM2UyYzIzYzQxMmNjZDY2NzdmYWIyNyIsIm5iZiI6MTc0ODM0NzE5MC4wOCwic3ViIjoiNjgzNWE5MzY0ZmY4Y2QwZmM3NzMwM2RkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JR8bpwBZfn-M7CydVKEtSpxZcMaU75TvPvsS8JIepa8";

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

// Отримує список популярних (трендових) фільмів за день
export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return response.data.results;
};

// Шукає фільми за ключовим словом (query)
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

// Отримує детальну інформацію про фільм за його ID
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return response.data;
};

// Отримує акторський склад фільму за його ID
export const fetchMovieCast = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return response.data.cast;
};

// Отримує відгуки користувачів про фільм за його ID
export const fetchMovieReviews = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return response.data.results;
};
