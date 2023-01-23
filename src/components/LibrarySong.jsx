import React from "react";

const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying}) => {
    
    
    
    const songSelectHandler = () => {
        setCurrentSong(song);
        
        
        console.log(song.name, song.active)
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
    }
    return (
        <div className={`library-song ${song.active ? "selected" : ""}`} onClick={songSelectHandler}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong