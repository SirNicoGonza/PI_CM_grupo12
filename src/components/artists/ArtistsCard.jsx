// Componente que genera un elemento card con la info de un artista

function ArtistsCard({ artists }){
    return (
        <div className="card">
            <div className="card-content" key={artists.id}>
                <i src={artists.image} className="artists-image" alt={artists.name}/>
                <p className="artists-name">{artists.name}</p>
            </div>
        </div>
    )
};

export default ArtistsCard;