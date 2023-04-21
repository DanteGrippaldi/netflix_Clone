import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Row.css";
import axios from "../axios";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl, movies]);

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie, i) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <Link
                className="row__link"
                to={
                  movie.original_title
                    ? `/movie/${movie.id}`
                    : `/tv/${movie.id}`
                }
              >
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  key={i}
                  alt={movie.name}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Row;
