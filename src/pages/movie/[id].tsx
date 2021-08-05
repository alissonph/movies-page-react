import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { api } from "../../utils/api";

type Props = {
  movie: Object;
};

type Params = {
  id: string;
};

export default function MovieDetail({ movie }: Props) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return <p>Post: {id}</p>;
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
