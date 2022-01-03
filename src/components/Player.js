import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons'

// adding components


const Player = ({setSongs,setCurrentSong,songs,currentSong,isPlaying,setIsPlaying,audioRef,setSongInfo,songInfo}) =>{
    
    // UseEffect 
  
    
    // event Handlers
    const activeLibraryHandler = (nextPrev) =>{
        const newSongs = songs.map((song) =>{
            if(song.id === nextPrev.id){
                return{
                 ...song,
                 active:true
                }
            }else{
                return{
                    ...song,
                    active:false
                }
           
            }
        })
        setSongs(newSongs)

    }
    const playSongHandler = () =>{
        
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
        
    }

    const getTime= (time)=>{
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

    }
    const dragHandler = (e) =>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})


    }
    const skipTrackHandler = async (direction) =>{
        let CurrentIndex = songs.findIndex((song) =>song.id === currentSong.id);
        console.log(CurrentIndex);
        if(direction==="skip-forward" ){
          await   setCurrentSong(songs[(CurrentIndex+1) % songs.length]);
          activeLibraryHandler(songs[(CurrentIndex+1) % songs.length])
            
        }
        if(direction === "skip-back"){
            if((CurrentIndex-1 ) % songs.length === -1){
                setCurrentSong(songs[songs.length - 1]);
                
                if(isPlaying) audioRef.current.play();
                return;
            }
            setCurrentSong(songs[(CurrentIndex - 1)  % songs.length])
            activeLibraryHandler(songs[(CurrentIndex-1) % songs.length])
        }
       if(isPlaying) audioRef.current.play();

    }
    // state

    // add the styles 
    const trackAnim = {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }
 
    return (
        <div className="player">
        <div className="time-control">
            <p>{songInfo.duration ? getTime(songInfo.currentTime) : "0:00"}</p>
            <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
            <input onChange={dragHandler} type="range" min={0} max={songInfo.duration || 0} value = {songInfo.currentTime}/>
            <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
            <FontAwesomeIcon onClick={() =>skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
            <FontAwesomeIcon onClick={() =>skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
        </div>
       
        </div>
    );
}

export default Player;