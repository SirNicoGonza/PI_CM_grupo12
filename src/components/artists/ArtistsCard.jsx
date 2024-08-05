// Componente que genera un elemento card con la info de un artista

function ArtistsCard({ artists }){
    <div className="card">
        <div className="card-content">
            <i className={artists.image}>{artists.image}</i>
            <p className="artists-name">{artists.name}</p>
        </div>
    </div>
};

export default ArtistsCard;