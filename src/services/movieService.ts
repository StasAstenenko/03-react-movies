import axios from 'axios';
import type { Movie } from '../types/movie';

interface ApiMovieResponse {
  results: Movie[];
}

export const getMovies = async (movie: string) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { data } = await axios.get<ApiMovieResponse>(url, {
    params: {
      query: movie,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return data;
};
