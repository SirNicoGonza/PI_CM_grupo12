// Componente que genera un elemento card con la info de una cancion
import "../songs/SongsCard.css";

function SongsCard({ songss }){
    const imageStyle = {
        backgroundImage: `url(${songss.cover})`,
        backgroundSize: 'cover',
        width: '150px',
        height: '150px',
        display: 'block',
    };

    return (
        <div className="song">
            <div className="card">
                <div className="card-content">
                    <p className="song-title">{songss.title}</p>
                    <i style={imageStyle}></i>
                    <audio controls>
                        <source src={songss.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento audio.
                    </audio>
                </div>
            </div>
        </div>
    );
};

export default SongsCard;