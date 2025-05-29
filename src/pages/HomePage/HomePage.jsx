import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/tmdbApi";
import { Link } from "react-router-dom";
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
      <ul className={styles.list}>
        {movies.map(({ id, title }) => (
          <li key={id} className={styles.item}>
            <Link to={`/movies/${id}`} className={styles.link}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
