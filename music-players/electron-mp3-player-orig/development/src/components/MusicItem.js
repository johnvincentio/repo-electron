import React from 'react';

import './css/MusicItem.css';

function MusicItem({ item, index, indexPlayed, changeSong }) {
    return (
        <div 
            className="music-item" 
            id={(indexPlayed === index) ? "played" : ""}  
            onClick={ () => changeSong(index) }
        >
            <span id="title">
                { item.title.substring(item.title.lastIndexOf('\\') + 1) }
            </span>
            <span id="artist-album">
                { item.artist || 'Unknown Artist' } - { item.album || 'Unknown Album' } 
            </span>
        </div>
    );
}

export default MusicItem;