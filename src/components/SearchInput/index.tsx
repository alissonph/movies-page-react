import { useCallback } from "react";
import debounce from "lodash.debounce";

import { useMovies } from "../../contexts/MoviesContext";
import styles from "./styles.module.scss";

export default function SearchInput() {
  const { searchMovies, clearMovies } = useMovies();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => searchMovies(value), 300),
    []
  );

  const handleInputChange = (value: string) => {
    if (!value) {
      clearMovies();
    }
    if (value.length >= 3) {
      debouncedSearch(value);
    }
  };

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search movies..."
      onChange={(input) => handleInputChange(input.target.value)}
    />
  );
}
