import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchMovie } from "../actions/movieActions";
import MovieDetail from "../components/moviedetail"

// support routing

function Movie(props) {
    const [selectedMovie] = useState(props.selectedMovie);
    const params = useParams();
    const movie_title = params.title;
    console.log('params', params);
    const dispatch = useDispatch();
    if (selectedMovie == null) {
        dispatch(fetchMovie(movie_title));
    }

    return (<MovieDetail movie_id={movie_title} />)
}

export default Movie;