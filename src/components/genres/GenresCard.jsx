// Componente que genera un elemento card con la info de un genero.
import { useNavigate } from "react-router-dom";
import "../genres/GenresCard.css";

function GenresCard({ genre }){
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/genres/${genre.id}`)
    }

    return (
        <div className="card" onClick={handleCardClick}>
            <div className="card-content">
                <img src="src\assets\genres_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="genre-name" />
                <p className="genre-name">{genre.name}</p>
            </div>
        </div>
    );
};

export default GenresCard;