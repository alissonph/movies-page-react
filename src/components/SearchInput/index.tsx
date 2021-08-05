import { useMovies } from "../../contexts/MoviesContext";
import styles from "./styles.module.scss";

export default function SearchInput() {
  const { searchMovies } = useMovies();

  const handleInputChange = (value: string) => {
    if (value.length >= 3) {
      searchMovies(value);
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
