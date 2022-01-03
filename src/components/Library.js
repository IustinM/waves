import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({libraryStatus,songs,setCurrentSong,audioRef,isPlaying,setSongs}) =>{
   
    return(
        <div className={`library ${libraryStatus ? 'active-library': ' '}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) =>(
                   
                    <LibrarySong setSongs={setSongs} isPlaying = {isPlaying} audioRef={audioRef} id = {song.id} songs={songs} setCurrentSong={setCurrentSong} song={song} key={song.id} />
                ))}
            </div>
        </div>
    );

}




export default Library;