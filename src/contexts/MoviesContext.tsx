import { createContext, ReactNode, useContext, useState } from "react";

import { api } from "../utils/api";
import { Movie } from "../types/Movie";

type MoviesContextData = {
  isLoading: boolean;
  searchMovies: (text: string) => void;
  movies: Movie[];
};

type MoviesResponse = {
  Response: string;
  Error?: string;
  Search: Movie[];
  totalResults: string;
};

export const MoviesContext = createContext({} as MoviesContextData);

type MoviesContextProviderProps = {
  children: ReactNode;
};

export function MoviesContextProvider({
  children,
}: MoviesContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([] as Movie[]);

  function searchMovies(text: string) {
    setIsLoading(true);
    api
      .get("/", { params: { s: text } })
      .then(({ data }: { data: MoviesResponse }) => {
        if (data.Response == "True") {
          setMovies(data.Search);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        searchMovies,
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MoviesContext);
};
