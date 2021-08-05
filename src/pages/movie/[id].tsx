import { GetServerSideProps } from "next";
import { useEffect } from "react";

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
  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <div className={styles.container}>
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <p>{movie.Language}</p>
      <p>{movie.Country}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Params;
  const { data } = await api.get("/", { params: { i: id } });

  return {
    props: {
      movie: data,
    },
  };
};
