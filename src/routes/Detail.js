import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setGenres(json.data.movie.genres);
    setLoading(false);
  }, [id]);
  console.log(movie);
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.page}>
          <div className={styles.BackImg}>
            <img src={movie.background_image} />
          </div>
          <div className={styles.MovieInformation}>
            <div>
              <img className={styles.coverImg} src={movie.medium_cover_image} />
            </div>
            <div>
              <h2>{movie.title_long}</h2>
              <h4>
                Rating : {movie.rating} Runtime : {movie.runtime}
              </h4>
              <ul className={styles.genres}>
                {genres.map((g, index) => (
                  <li key={index}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>{movie.description_full}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
