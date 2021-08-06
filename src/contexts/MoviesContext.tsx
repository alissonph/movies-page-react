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
  toggleFavorite: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  movies: Movie[];
};

type MoviesResponse = {
  Response: string;
  Error?: string;
  Search: Movie[];
  totalResults: string;
};

type FavoriteItems = {
  items: Item[];
};

type Item = {
  id: string;
  favorite: boolean;
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

          newMovies.forEach(
            (item) => (item.favorite = isFavorite(item.imdbID))
          );

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

  function getFavoriteItems() {
    let favorites: FavoriteItems = { items: [] };
    const favoritesSaved = localStorage.getItem("favorite_items");

    if (favoritesSaved) {
      favorites = JSON.parse(favoritesSaved);
    }

    return favorites;
  }

  function toggleFavorite(id: string) {
    let favorite = false;
    const favorites = getFavoriteItems();
    const itemIndex = favorites.items.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      favorite = !favorites.items[itemIndex].favorite;

      if (favorite) {
        favorites.items[itemIndex].favorite = favorite;
      } else {
        favorites.items.splice(itemIndex, 1);
      }
    } else {
      favorite = true;
      const item = { id, favorite };
      favorites.items.push(item);
    }

    localStorage.setItem("favorite_items", JSON.stringify(favorites));

    return favorite;
  }

  function isFavorite(id: string) {
    const favorites = getFavoriteItems();
    const itemIndex = favorites.items.findIndex((item) => item.id === id);

    if (itemIndex > -1) {
      return favorites.items[itemIndex].favorite;
    }

    return false;
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
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MoviesContext);
};
