import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { searchMovies } from "../../services/tmdbApi";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }
    const fetchMovies = async () => {
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchParams({ query: trimmed });
  };

  const handleMovieClick = (id) => {
    // Передаємо у state поточний шлях + параметри для кнопки Go Back
    navigate(`/movies/${id}`, {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies"
          autoFocus
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {movies.length > 0 ? (
        <ul className={styles.list}>
          {movies.map((movie) => (
            <li
              key={movie.id}
              className={styles.listItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      ) : (
        searchQuery && <p>No movies found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default MoviesPage;
