import Image from "next/image";

import { useMovies } from "../../contexts/MoviesContext";
import styles from "./styles.module.scss";

export default function MoviesList() {
  const { movies } = useMovies();

  return (
    <div className={styles.container}>
      {movies && (
        <div className={styles.movies}>
          {movies.map((movie, index) => {
            if (movie.Poster && movie.Poster != "N/A") {
              return (
                <div className={styles.movie} key={`${movie.imdbID}_${index}`}>
                  <Image
                    src={movie.Poster}
                    alt="Movie poster image"
                    width={180}
                    height={240}
                  />
                </div>
              );
            }
          })}
        </div>
      )}
      <div className={styles.emptyState}>
        <Image
          src="/illustration-empty-state.svg"
          alt="Illustration when user doesn't search"
          width={396}
          height={193}
        />

        <span className={styles.title}>Dont know what to search?</span>
        <span className={styles.subTitle}>
          Here is an offer you cant refuse
        </span>
      </div>
    </div>
  );
}
