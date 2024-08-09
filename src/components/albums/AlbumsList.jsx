/*import AlbumsCard from "./AlbumsCard";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState, useCallback } from 'react';

//Componente que genera una lista de card con todos los albums de la api
function AlbumsList(){
    const [albums, setAlbums] = useState([]);
    const [nextUrl, setNextUrl] = useState(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/albums/`);
    const [{ data, isError, isLoading }, doFetch] = useFetch(nextUrl, {});

    useEffect(() => {
        if (nextUrl != null) {
            doFetch();
        }
    }, [nextUrl]);

    useEffect(() => {
        if (data) {
            setAlbums(prevAlbums => [...prevAlbums, ...data.results]);
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

    if (isLoading && albums.length === 0) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albums</p>;
    if (albums.length === 0) return <p>No hay albums disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title"> Lista de Albums</h2>
                <ul>
                    {albums.map((album)=>(
                        <div key={album.id} className="column is-two-third">
                            <AlbumsCard albumes={album}/>
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

export default AlbumsList;*/

import AlbumsCard from "./AlbumsCard";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from 'react';

// Componente que genera una lista de card con todos los albums de la API
function AlbumsList() {
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const albumsPerPage = 5; // Cantidad de álbumes por página

    // Generar la URL de la API para la página actual
    const nextUrl = `${import.meta.env.VITE_API_BASE_URL_HARMONY}/albums/?page=${currentPage}&page_size=${albumsPerPage}`;

    const [{ data, isError, isLoading }, doFetch] = useFetch(nextUrl, {});

    useEffect(() => {
        doFetch();
    }, [nextUrl]);

    useEffect(() => {
        if (data) {
            setAlbums(data.results);
            setTotalPages(Math.ceil(data.count / albumsPerPage)); // Calcula el total de páginas
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

    if (isLoading && albums.length === 0) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albums</p>;
    if (albums.length === 0) return <p>No hay albums disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Albums</h2>
                <ul>
                    {albums.map(album => (
                        <div key={album.id} className="column is-two-third">
                            <AlbumsCard albumes={album} />
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

export default AlbumsList;
