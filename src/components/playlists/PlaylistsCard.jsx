import React from 'react';

function PlaylistCard({ playlist }) {
    const imageUrl = playlist.image || 'src/assets/music.png';

    return (
        <div className="card">
            <div className="card-content">
                <img src={imageUrl} alt={`${playlist.name} cover`} style={{ width: '50px', height: '50px' }} />
                <p className="title">{playlist.name}</p>
                <p className="subtitle">{playlist.description}</p>
            </div>
        </div>
    );
}

export default PlaylistCard;
