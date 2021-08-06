import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import styles from "./styles.module.scss";
import { api } from "../../utils/api";
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
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <p>{movie.Language}</p>
      <p>{movie.Country}</p>
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
