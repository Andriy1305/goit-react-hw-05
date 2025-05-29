import React from "react";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={styles.listItem}
          onClick={() => onMovieClick(movie.id)}
          tabIndex={0} // щоб можна було фокусувати для клавіатури
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onMovieClick(movie.id);
            }
          }}
          role="button" // для доступності
        >
          {movie.title}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
