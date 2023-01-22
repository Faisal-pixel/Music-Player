import React, { useRef, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./util"

import "./styles/app.scss"
import Library from "./components/Library";


function App() {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
  })

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo(prevValue => {
        return (
            {...prevValue, currentTime: current, duration}
        )
    })
}
  

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo}/>

      <Library isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
