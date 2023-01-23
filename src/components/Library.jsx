import React, {useEffect} from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong}) => {
    useEffect(() => {
        const newSongs = songs.map(song => {
            if(song.id === currentSong.id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs);
    }, [currentSong])
    return(
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map( song => (
                        <LibrarySong key={song.id} song={song} currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} audioRef={audioRef} isPlaying={isPlaying} setSongs={setSongs}/>
                    ))
                }
                
            </div>
        </div>
    )
}

export default Library;