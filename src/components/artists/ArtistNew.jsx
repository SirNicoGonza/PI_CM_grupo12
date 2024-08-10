import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function ArtistNew() {
    const {token} = useAuth("state");
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL_HARMONY}/artists/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    name: name,
                    bio: bio,
                    website: website,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear el artista');
            }

            const data = await response.json();
            setSuccessMessage(`Artista ${data.name} creado con éxito.`);
            setName('');
            setBio('');
            setWebsite('');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Artista</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Artista:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Bio del artista:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <div>
                    <label>Website del Artista:</label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Crear Artista'}
                </button>
            </form>
            <button onClick={()=> navigate("/artists")}>Volver</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default ArtistNew;
