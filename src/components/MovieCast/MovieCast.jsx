import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdbApi";
import styles from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then((data) => {
        const filteredCast = data.filter((actor) => actor.profile_path);
        setCast(filteredCast);
      })
      .catch(() => setError("Не вдалося завантажити акторів"));
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (cast.length === 0) {
    return;
  }

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, profile_path, name }) => (
        <li key={id} className={styles.castItem}>
          <img
            src={`${IMAGE_BASE_URL}${profile_path}`}
            alt={name}
            className={styles.castImage}
          />
          <p className={styles.castName}>{name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
