import PlaylistsCard from "./PlaylistsCard";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useState } from 'react';

// Componente de todas las playlists de la API
function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const playlistsPerPage = 10; // Cantidad de playlists por página

    // Generar la URL de la API para la página actual
    const nextUrl = `${import.meta.env.VITE_API_BASE_URL_HARMONY}/playlists/?page=${currentPage}&page_size=${playlistsPerPage}`;

    const [{ data, isError, isLoading }, doFetch] = useFetch(nextUrl, {});

    useEffect(() => {
        doFetch();
    }, [nextUrl]);

    useEffect(() => {
        if (data) {
            setPlaylists(data.results);
            setTotalPages(Math.ceil(data.count / playlistsPerPage)); // Calcula el total de páginas
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

    const filteredPlaylists = playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading && playlists.length === 0) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las listas de reproducción</p>;
    if (playlists.length === 0) return <p>No hay listas de reproducción disponibles</p>;

    return (
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <div className="my-5">
                <h2 className="title">Lista de Reproducción</h2>
                
                <input
                    type="text"
                    placeholder="Buscar en Playlist ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '15px', marginLeft: '10px', padding: '5px', width: 'calc(30% - 20px)' }}
                />
                
                <ul>
                    {filteredPlaylists.map(playlist => (
                        <div key={playlist.id} className="column is-two-third">
                            <PlaylistsCard playlist={playlist} />
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

export default Playlists;
