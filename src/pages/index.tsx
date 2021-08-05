import Head from "next/head";

import styles from "../styles/Home.module.scss";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import MoviesList from "../components/MoviesList";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Movies Page</title>
        <meta name="description" content="Movies website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <SearchInput />
          <MoviesList />
        </main>
      </div>
    </div>
  );
}
