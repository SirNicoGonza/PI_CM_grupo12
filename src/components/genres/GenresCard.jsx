import React from 'react';
import { useNavigate } from "react-router-dom";
import "../genres/GenresCard.css";

function GenresCard({ genress }) {
    const navigate = useNavigate();
    const handleGenreClick = () => {
        navigate(`/genres/${genress.id}`)
    }

    return (
        <div className="card" onClick={handleGenreClick}>
            <div className="card-content">
                <img src="src\assets\genres_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="genre-name" />
                <p className="name">{genress.name}</p>
                <p className="description">{genress.description}</p>
                <p className='cantSongs'>Cantidad de canciones: {genress.songs.length}</p>
            </div>
        </div>
    );
}

export default GenresCard;