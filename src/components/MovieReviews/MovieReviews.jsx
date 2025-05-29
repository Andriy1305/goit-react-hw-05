import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/tmdbApi";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to load reviews");
        console.error(err);
      }
    };
    getReviews();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!reviews.length) {
    return (
      <p className={styles.message}>No reviews available for this movie.</p>
    );
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.reviewItem}>
          <h4 className={styles.author}>Author: {author}</h4>
          <p className={styles.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
