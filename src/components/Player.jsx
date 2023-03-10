import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songs, currentSong, setCurrentSong}) => {


    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
            
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

    

    const formatTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);
        if(direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        } else if(direction === "skip-back") {
            if((currentIndex - 1) === -1) {
                setCurrentSong(songs[songs.length -1])
            } else {
                setCurrentSong(songs[(currentIndex - 1) % songs.length])
            }
            
        }
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, #ffafbd, #ffc3a0)`}} className="track">
                    <input min="0" max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler} />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
            
        </div>
    )
}

export default Player;