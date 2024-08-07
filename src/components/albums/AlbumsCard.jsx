import React, { useState, useEffect } from 'react';

// Componente que genera un elemento card con la info de un artista

function AlbumsCard({ albumes }){
    const imageStyle = {
        backgroundImage: `url(${albumes.cover})`,
        backgroundSize: 'cover',
        width: '50px',
        height: '50px',
        display: 'block',
    };


    const [artist, setArtist] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Fetch artist data when album.artist changes
        const fetchArtist = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/${albumes.artist}/`);
                if (!response.ok) {
                    throw new Error('Error fetching artist data');
                }
                const artistData = await response.json();
                setArtist(artistData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching artist:', error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        if (albumes.artist) {
            fetchArtist();
        }
    }, []);

    if (isLoading) return <p>Loading artist...</p>;
    if (isError) return <p>Error loading artist</p>;



    return (
        <div className="card">
            <div className="card-content">
                <p className="albums-name">{albumes.title}</p>
                <i style={imageStyle}></i>
                <p className="albums-artist">{artist.name}</p>
                <p className="albums-year">{albumes.year}</p>
                <br />
                <br />
            </div>
        </div>
    );
};

export default AlbumsCard;