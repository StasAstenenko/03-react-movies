import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';
import { useState } from 'react';

interface SearchBarProps {
  onSubmit: (movie: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [error, setError] = useState(false);
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    setError(false);
    if (query === '') {
      toast.error('Please enter your search query.');
      setError(true);
      return;
    }

    onSubmit(query);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a
            className={styles.link}
            href='https://www.themoviedb.org/'
            target='_blank'
            rel='noopener noreferrer'
          />
          Powered by TMDB
          <form className={styles.form} action={handleSubmit}>
            <input
              className={styles.input}
              type='text'
              name='query'
              autoComplete='off'
              placeholder='Search movies...'
              autoFocus
            />

            <button className={styles.button} type='submit'>
              Search
            </button>
          </form>
        </div>
      </header>
      {error && <Toaster />}
    </>
  );
};

export default SearchBar;
