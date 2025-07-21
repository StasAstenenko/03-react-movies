import { getMovies } from './services/movieService';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import type { Movie } from './types/movie';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [searchMovie, setSearchMovie] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieError, setMovieError] = useState(false);

  const openModal = (movie: Movie) => {
    setMovie(movie);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setMovie(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    const fetchMovies = async (movie: string) => {
      try {
        setIsLoading(true);
        const { results } = await getMovies(movie);
        setIsError(false);
        setMovieError(false);
        setMovies(results);
        if (results.length === 0) {
          toast.error('No movies found for your request.');
          return setMovieError(true);
        }
        return results;
      } catch (error) {
        setIsError(true);
        return error;
      } finally {
        setIsLoading(false);
      }
    };

    if (searchMovie.trim() !== '') {
      fetchMovies(searchMovie);
    }
  }, [searchMovie]);

  const handleSubmit = async (movie: string) => {
    setSearchMovie(movie);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isOpenModal && <MovieModal onClose={closeModal} movie={movie} />}
      {movieError && <Toaster />}
    </div>
  );
};

export default App;
