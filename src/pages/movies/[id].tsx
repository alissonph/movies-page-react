import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { MovieDetails } from "../../types/Movie";

type Props = {
  movie: MovieDetails;
};

type Params = {
  id: string;
};

export default function MovieDetail({ movie }: Props) {
  const router = useRouter();

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{movie.Title} | Movies</title>
      </Head>

      <Image
        onClick={() => router.back()}
        className={styles.buttonBack}
        src="/icon_arrow.svg"
        alt="Arrow to go back home"
        width={24}
        height={24}
      />
      <div className={styles.dataContainer}>
        <div className={styles.data}>
          <p className={styles.durationInfo}>
            {movie.Runtime} - {movie.Year} - {movie.Rated}
          </p>
          <h1>{movie.Title}</h1>

          <div className={styles.ratingContainer}>
            <div className={styles.imdb}>
              <div className={styles.title}>IMDb</div>
              <div className={styles.text}>
                <span>
                  {movie.imdbRating}
                  {movie.imdbRating != "N/A" && "/10"}
                </span>
              </div>
            </div>

            <div className={styles.score}>
              <div className={styles.title}>
                <Image
                  src="/Rotten_Tomatoes_rotten.svg"
                  alt="Score image"
                  width={17}
                  height={16}
                />
              </div>
              <div className={styles.text}>
                <span>
                  {movie.Metascore}
                  {movie.Metascore != "N/A" && "%"}
                </span>
              </div>
            </div>

            <div className={styles.favorite}>
              <Image
                src="/icon_favorite_disable.svg"
                alt="Favorite image"
                width={16}
                height={16}
              />
              <span>Add to favorites</span>
            </div>
          </div>

          <div className={`${styles.box} ${styles.plot}`}>
            <h5>Plot</h5>
            <p>{movie.Plot}</p>
          </div>

          <div className={styles.adicionalInfoContainer}>
            <div className={styles.box}>
              <h5>Cast</h5>
              {movie.Writer.split(",").map((item) => {
                const title = item.trim();
                return <span key={title}>{title}</span>;
              })}
            </div>
            <div className={styles.box}>
              <h5>Genre</h5>
              {movie.Genre.split(",").map((item) => {
                const title = item.trim();
                return <span key={title}>{title}</span>;
              })}
            </div>
            <div className={styles.box}>
              <h5>Director</h5>
              {movie.Director.split(",").map((item) => {
                const title = item.trim();
                return <span key={title}>{title}</span>;
              })}
            </div>
          </div>
        </div>
        <div className={styles.cover}>
          <Image
            src={
              movie.Poster != "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/480x640"
            }
            alt="Cover image"
            width={480}
            height={640}
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;
  const { data } = await api.get("/", { params: { i: id } });

  return {
    props: {
      movie: data,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
