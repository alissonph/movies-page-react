import { createContext, ReactNode, useContext, useState } from "react";

import { api } from "../utils/api";
import { Movie } from "../types/Movie";

type MoviesContextData = {
  isLoading: boolean;
  total: number;
  page: number;
  searchMovies: (text: string) => void;
  clearMovies: () => void;
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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([] as Movie[]);

  function searchMovies(text: string, page: number = 1) {
    setIsLoading(true);
    api
      .get("/", { params: { s: text, page } })
      .then(({ data }: { data: MoviesResponse }) => {
        if (data.Response == "True") {
          setMovies(data.Search);
          setTotal(Number(data.totalResults));
          setPage(page);
        } else {
          clearMovies();
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  function clearMovies() {
    setMovies([] as Movie[]);
    setTotal(0);
    setPage(1);
  }

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        total,
        page,
        searchMovies,
        movies,
        clearMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MoviesContext);
};
