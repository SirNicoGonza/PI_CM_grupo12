import ArtistsCard from "./ArtistsCard";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState, useCallback } from 'react';

//Componente que genera una lista de card con todos los artistas de la api
function ArtistsList(){
    const [artists, setArtists] = useState([]);
    const [nextUrl, setNextUrl] = useState(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/`);
    const [{ data, isError, isLoading }, doFetch] = useFetch(nextUrl, {});

    useEffect(() => {
        if (nextUrl) {
            doFetch();
        }
    }, [nextUrl]);

    useEffect(() => {
        if (data) {
            setArtists(prevArtists => [...prevArtists, ...data.results]);
            setNextUrl(data.next);
        }
    }, [data]);

    const handleLoadMore = useCallback(() => {
        if (nextUrl) {
            doFetch();
        }
    }, [nextUrl, doFetch]);

    useEffect(() => {
        console.log("data:", data);
        console.log("isError:", isError);
        console.log("isLoading:", isLoading);
    }, [data, isError, isLoading]);

    if (isLoading && artists.length === 0) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los artistas</p>;
    if (artists.length === 0) return <p>No hay artistas disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title"> Lista de Artistas</h2>
                <ul>
                    {artists.map((artista)=>(
                        <div key={artista.id} className="column is-two-third">
                            <ArtistsCard artist={artista}/>
                        </div>
                    ))}
                </ul>
                {nextUrl && !isLoading && (
                    <button onClick={handleLoadMore}>Cargar más</button>
                )}
                {isLoading && <p>Cargando más...</p>}
            </div>
        </div>
    );
};

export default ArtistsList;