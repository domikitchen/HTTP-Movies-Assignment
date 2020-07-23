import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteItem = evt => {
    evt.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(response => {
        console.log(response);
        push(`/`);
        axios.get(`http://localhost:5000/api/movies`)
          .then(res => {
            console.log(res.data);
            setMovieList(res.data);
          })
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className = "heckingButtons">
        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
        <div onClick = {() => push(`/update-movie/${movie.id}`)} className = "save-button">
          Edit
        </div>
        <div onClick = {deleteItem} className = "save-button">
          Delete
        </div>
      </div>
    </div>
  );
}

export default Movie;
