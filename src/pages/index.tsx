import Head from "next/head";

import styles from "../styles/Home.module.scss";
import SearchInput from "../components/SearchInput";
import MoviesList from "../components/MoviesList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Movies</title>
      </Head>
      <main className={styles.main}>
        <SearchInput />
        <MoviesList />
      </main>
    </>
  );
}
