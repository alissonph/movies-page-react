import { createContext, ReactNode, useContext, useState } from "react";

import { api } from "../services/api";
import { Movie } from "../types/Movie";

type MoviesContextData = {
  isLoading: boolean;
  hasMore: boolean;
  total: number;
  page: number;
  searchMovies: (text: string) => void;
  loadMore: () => void;
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
  const [text, setText] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([] as Movie[]);

  function searchMovies(text: string, page: number = 1) {
    setIsLoading(true);
    setText(text);
    api
      .get("/", { params: { s: text, page } })
      .then(({ data }: { data: MoviesResponse }) => {
        if (data.Response == "True") {
          let newMovies = data.Search;
          if (page === 1) {
            setMovies(newMovies);
          } else {
            newMovies = [...movies, ...data.Search];
            setMovies(newMovies);
          }

          if (newMovies.length < Number(data.totalResults)) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }

          setTotal(Number(data.totalResults));
          setPage(page);
        } else {
          clearMovies();
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }

  function loadMore() {
    if (hasMore) {
      const nextPage = page + 1;
      searchMovies(text, nextPage);
    }
  }

  function clearMovies() {
    setMovies([] as Movie[]);
    setText("");
    setTotal(0);
    setPage(1);
    setHasMore(false);
  }

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        hasMore,
        total,
        page,
        searchMovies,
        loadMore,
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
