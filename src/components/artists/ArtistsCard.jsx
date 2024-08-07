// Componente que genera un elemento card con la info de un artista

function ArtistsCard({ artist }){
    const imageStyle = {
        backgroundImage: `url(${artist.image})`,
        backgroundSize: 'cover',
        width: '50px',
        height: '50px',
        display: 'block',
    };

    return (
        <div className="card">
            <div className="card-content">
                {/*<i className={artists.image}>{artists.image}</i>*/}
                <i style={imageStyle}></i>
                <p className="artists-name">{artist.name}</p>
            </div>
        </div>
    );
};

export default ArtistsCard;