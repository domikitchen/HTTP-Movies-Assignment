import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initalItemValues = {
    title: "",
    director: "",
    metascore: "",
    id: "",
    stars: []
}

const UpdateMovie = () => {
    const [item, setItem] = useState(initalItemValues);
    const { push } = useHistory();
    const params = useParams();

    useEffect(() => {
        console.log(params)
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
            .then(response => {
                console.log(response.data);
                setItem(response.data);
            })
            .catch(error => {
                console.log(error.message);
            })
    }, []);

    const onChange = evt => {
        setItem({
            ...item,
            [evt.target.name]: evt.target.value
        })
    }

    const onSubmit = evt => {
        evt.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${item.id}`, item)
            .then(response => {
                console.log(response.data)
                push(`/movies/${item.id}`);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return(
        <div className = "save-wrapper">
            <form onSubmit = {onSubmit}>
                <label>
                    Title:
                    <input
                        type = "text"
                        name = "title"
                        value = {item.title}
                        onChange = {onChange}
                        placeholder = "title..."
                    />
                </label>
                <label>
                    Director:
                    <input
                        type = "text"
                        name = "director"
                        value = {item.director}
                        onChange = {onChange}
                        placeholder = "director..."
                    />
                </label>
                <label>
                    Metascore:
                    <input
                        type = "number"
                        name = "metascore"
                        value = {item.metascore}
                        onChange = {onChange}
                        placeholder = "metascore..."
                    />
                </label>
                <button onClick = {onSubmit}>Update</button>
            </form>
        </div>
    );
}

export default UpdateMovie;