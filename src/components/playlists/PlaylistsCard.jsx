import React from 'react';

function PlaylistsCard({ playlist }) {
    return (
        <div className="card">
            <div className="card-content">
                <p className="title">{playlist.name}</p>
                <p className="subtitle">{playlist.description}</p>
                {/* Agrega más detalles según sea necesario */}
            </div>
        </div>
    );
}

export default PlaylistsCard;
