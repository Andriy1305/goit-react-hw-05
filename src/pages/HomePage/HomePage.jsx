import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(() => setError("Помилка завантаження фільмів"));
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.tittle}>Trending Movies</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
