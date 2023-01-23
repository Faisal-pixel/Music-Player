import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo}) => {


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
        console.log(e.target.value)
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    return(
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <input min="0" max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler} />
                <p>{formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
            <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
            
        </div>
    )
}

export default Player;