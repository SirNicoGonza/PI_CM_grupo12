/*import ArtistsCard from "./ArtistsCard";
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

export default ArtistsList;*/

import ArtistsCard from "./ArtistsCard";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from 'react';

// Componente que genera una lista de card con todas las canciones de la API
function ArtistsList() {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const artistsPerPage = 5; // Cantidad de artistas por página

    // Generar la URL de la API para la página actual
    const nextUrl = `${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/?page=${currentPage}&page_size=${artistsPerPage}`;

    const [{ data, isError, isLoading }, doFetch] = useFetch(nextUrl, {});

    useEffect(() => {
        doFetch();
    }, [nextUrl]);

    useEffect(() => {
        if (data) {
            setArtists(data.results);
            setTotalPages(Math.ceil(data.count / artistsPerPage)); // Calcula el total de artistas
        }
    }, [data]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (isLoading && artists.length === 0) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones</p>;
    if (artists.length === 0) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <ul>
                    {artists.map(artista => (
                        <div key={artista.id} className="column is-two-third">
                            <ArtistsCard artist={artista} />
                        </div>
                    ))}
                </ul>
                <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArtistsList;