import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/tmdbApi";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? "/");
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackBtn}>
        &larr; Go Back
      </button>

      <div className={styles.details}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "/no-image.jpg"
          }
          alt={movie.title}
        />
        <div className={styles.info}>
          <h1 className={styles.tittle}>{movie.title}</h1>
          <p className={styles.h}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h2 className={styles.overview}>Overview</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <h3 className={styles.genders}>Genres</h3>
          <p className={styles.some}>
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>

      <div className={styles.additional}>
        <h3 className={styles.add}>Additional information</h3>
        <ul className={styles.linksList}>
          <li>
            <Link
              className={styles.link}
              to="cast"
              state={{ from: location.state?.from }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              to="reviews"
              state={{ from: location.state?.from }}
            >
              Reviews
            </Link>
          </li>
        </ul>

        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
