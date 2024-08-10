import React from 'react';
import { useNavigate } from "react-router-dom";

function GenresCard({ genress }) {
    const navigate = useNavigate();
    const handleGenreClick = () => {
        navigate(`/genres/${genress.id}`)
    }

    return (
        <div className="card" onClick={handleGenreClick}>
            <div className="card-content">
                <p className="name">{genress.name}</p>
                <p className="description">{genress.description}</p>
                <p className='cantSongs'>Cantidad de canciones: {genress.songs.length}</p>
            </div>
        </div>
    );
}

export default GenresCard;
