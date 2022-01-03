import React,{useState} from "react";


const LibrarySong =  ({songs,song,setCurrentSong,id,audioRef,isPlaying,setSongs}) =>{

    const  songSelectHandler = async () =>{
        // add active state
        const newSongs = songs.map((song) =>{
            if(song.id === id){
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
           await setCurrentSong(song);

        //    chech if song is playing
        if(isPlaying) audioRef.current.play();
    
    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
        <img src={song.cover} alt={song.name}></img>
        <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
        </div>
    );
}

export default LibrarySong;