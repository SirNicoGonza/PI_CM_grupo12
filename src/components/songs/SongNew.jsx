import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../songs/SongNew.css";

// Componente que permite subir una cancion
function SongNew(){
    const {token} = useAuth("state");
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [ genres, setGenres]= useState("");
    const [songFile, setSongFile] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Se cran los manejadores
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    };

    const handleAlbumChange = (event) => {
        setAlbum(event.target.value);
    };

    const handleGenresChange = (event) => {
        setGenres(event.target.value);
    };

    const handleSongFileChange = (event) => {
        setSongFile(event.target.files[0]);
    };

    //Se envia el archivo por el metodo 'POST'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('year', year);
        formData.append('song_file', songFile);
        formData.append('artists', artist);
        formData.append('album', album);
        formData.append('genres', genres);

        try {
            const response= await fetch(
                `${import.meta.env.VITE_API_BASE_URL_HARMONY}/songs/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData
                });
        
            if (!response.ok) {
                throw new Error('Error al subir la cancion');
            }
            const data = await response.json();
            setSuccessMessage(`Genero ${data.title} creado con éxito.`);
            setTitle("");
            setYear("");
            setSongFile(null);
            setArtist("");
            setAlbum("");
            setGenres("");

        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }

    }
    return (
        <div className="song-new-container">
            <h2>Nueva Cancion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titulo de la Cancion:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label>Año:</label>
                    <input
                        type="text"
                        value={year}
                        onChange={handleYearChange}
                    />
                </div>
                <div>
                    <label>Artista:</label>
                    <input
                        type="text"
                        value={artist}
                        onChange={handleArtistChange}
                    />
                </div>
                <div>
                    <label>Album:</label>
                    <input
                        type="text"
                        value={album}
                        onChange={handleAlbumChange}
                    />
                </div>
                <div>
                    <label>Genero:</label>
                    <input
                        type="text"
                        value={genres}
                        onChange={handleGenresChange}
                    />
                </div>
                <div>
                    <label>Aqui suba la cancion:</label>
                    <input
                        type="file"
                        onChange={handleSongFileChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Subir Cancion'}
                </button>
            </form>
            <button onClick={()=> navigate("/songs")}>Volver</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default SongNew;
