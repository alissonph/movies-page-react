import Image from "next/image";
import Link from "next/link";

import { useMovies } from "../../contexts/MoviesContext";
import styles from "./styles.module.scss";

export default function MoviesList() {
  const { movies, isLoading } = useMovies();

  return (
    <div className={styles.container}>
      {isLoading && (
        <Image src="/loading.svg" alt="Loading image" width={120} height={30} />
      )}

      {!isLoading && movies && (
        <div className={styles.movies}>
          {movies.map((movie, index) => {
            return (
              <Link
                href={`/movie/${movie.imdbID}`}
                key={`${movie.imdbID}_${index}`}
                passHref
              >
                <div className={styles.movie}>
                  <div className={styles.coverImage}>
                    <Image
                      src={
                        movie.Poster != "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/180x240"
                      }
                      alt="Movie poster image"
                      width={180}
                      height={240}
                    />
                  </div>
                  <div className={styles.favorite}>
                    <Image
                      src="/icon_heart.svg"
                      alt="Favorite image"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.title}>{movie.Title}</span>
                    <span>{movie.Year}</span>
                  </div>
                </div>
              </Link>
            );
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
