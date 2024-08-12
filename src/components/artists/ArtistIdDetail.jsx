import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../contexts/AuthContext';

function ArtistIdDetail() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [user, setUser] = useState(null);
    const [{ data, isError, isLoading }, doFetch] = useFetch(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/${id}/`);
    const navigate = useNavigate();
    const { token } = useAuth("state"); // Obtén el token del usuario logueado

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/profiles/profile_data/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const userData = await response.json();
                setUser(userData);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        doFetch();
    }, [id]);

    useEffect(() => {
        if (data) {
            setArtist(data);
        }
    }, [data]);

    const handleEditArtist = () => {
		navigate(`/artists/${id}/edit`);
	};

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los detalles del artista</p>;
    if (!artist) return <p>No se encontraron detalles del artista</p>;

    // Verifica si el artista fue creado por el usuario logueado
    const canEdit = user && artist.owner === user.user__id;

    return (
        <div>
            <h2>{artist.name}</h2>
            <img src={artist.image} alt={artist.name} style={{ width: '300px', height: '300px' }} />
            <p>{artist.bio}</p>
            <p>{artist.website}</p>
            {canEdit && (
                <button onClick={handleEditArtist}>Editar</button>
            )}
            <button onClick={() => navigate("/artists")}>Volver</button>
        </div>
    );
}

export default ArtistIdDetail;
