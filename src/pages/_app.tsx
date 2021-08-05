import type { AppProps } from "next/app";

import "../styles/globals.scss";
import { MoviesContextProvider } from "../contexts/MoviesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoviesContextProvider>
      <Component {...pageProps} />
    </MoviesContextProvider>
  );
}
export default MyApp;
