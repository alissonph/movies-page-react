import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useMovies } from "../../contexts/MoviesContext";
import { Movie } from "../../types/Movie";
import styles from "./styles.module.scss";

export default function MoviesList() {
  const {
    movies: storeMovies,
    isLoading,
    hasMore,
    loadMore,
    toggleFavorite,
  } = useMovies();

  const [movies, setMovies] = useState([] as Movie[]);

  function handleFavoriteClick(index: number) {
    const newMovies = movies;
    const favorite = toggleFavorite(newMovies[index].imdbID);
    newMovies[index].favorite = favorite;

    setMovies([...newMovies]);
  }

  useEffect(() => {
    setMovies(storeMovies);
  }, [storeMovies]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <Image src="/loading.svg" alt="Loading image" width={120} height={30} />
      )}

      {movies.length && (
        <div className={styles.movies}>
          {movies.map((movie, index) => {
            return (
              <div className={styles.movie} key={`${movie.imdbID}_${index}`}>
                <div className={styles.coverImage}>
                  <Link href={`/movies/${movie.imdbID}`} passHref>
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
                  </Link>
                </div>
                <div
                  className={styles.favorite}
                  onClick={() => handleFavoriteClick(index)}
                >
                  {movie.favorite && (
                    <Image
                      src={"/icon_heart_filled.svg"}
                      alt="Favorite image filled"
                      width={24}
                      height={24}
                    />
                  )}
                  {!movie.favorite && (
                    <Image
                      src={"/icon_heart.svg"}
                      alt="Favorite image"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <Link href={`/movies/${movie.imdbID}`} passHref>
                  <div className={styles.info}>
                    <span className={styles.title}>{movie.Title}</span>
                    <span>{movie.Year}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {movies.length && hasMore && (
        <button
          type="button"
          className={styles.buttonLoadMore}
          onClick={loadMore}
          disabled={isLoading}
        >
          {!isLoading && "Load More..."}
          {isLoading && (
            <Image
              src="/loading.svg"
              alt="Loading image"
              width={60}
              height={10}
            />
          )}
        </button>
      )}

      {!isLoading && !movies.length && (
        <div className={styles.emptyState}>
          <Image
            src="/illustration-empty-state.svg"
            alt="Illustration when user doesn't search"
            width={396}
            height={193}
          />

          <span className={styles.title}>Don&apos;t know what to search?</span>
          <span className={styles.subTitle}>
            Here&apos;s an offer you can&apos;t refuse
          </span>
        </div>
      )}
    </div>
  );
}
