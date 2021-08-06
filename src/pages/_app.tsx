import Router from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";

import "../styles/globals.scss";
import "../styles/nprogress.scss";
import styles from "../styles/app.module.scss";

import { MoviesContextProvider } from "../contexts/MoviesContext";
import Header from "../components/Header";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoviesContextProvider>
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </MoviesContextProvider>
  );
}
export default MyApp;
