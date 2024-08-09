import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function ArtistIdDetail() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [{ data, isError, isLoading }, doFetch] = useFetch(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/${id}/`);
    const navigate = useNavigate();

    useEffect(() => {
        doFetch();
    }, [id]);

    useEffect(() => {
        if (data) {
            setArtist(data);
        }
    }, [data]);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los detalles del artista</p>;
    if (!artist) return <p>No se encontraron detalles del artista</p>;

    return (
        <div>
            <h2>{artist.name}</h2>
            <img src={artist.image} alt={artist.name} />
            <p>{artist.bio}</p>
            <p>{artist.website}</p>
            <button onClick={()=> navigate("/artists")}>Volver</button>
        </div>
    );
}

export default ArtistIdDetail;
