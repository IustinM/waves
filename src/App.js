import React,{useState,useRef} from 'react';
import './styles/App.css';
// adding components
import Player from "./components/Player";
import Song from './components/Song';
// import util
import data from './data'
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  // ref
  const audioRef = useRef(null);
  const [songs,setSongs] = useState(data());
  const [currentSong , setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [songInfo,setSongInfo] = useState({
    currentTime : 0,
    duration : 0,
    animationPercentage :0
});
const [libraryStatus,setLibraryStatus] = useState(false);
const timeUpdateHandler = (e) =>{
  const current = e.target.currentTime;
  const duration = e.target.duration;
  // Calculate Percentage
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)
  console.log(animation)
  setSongInfo({...songInfo,currentTime:current,duration,animationPercentage : animation})
}
const songEndHandler = async () =>{
  let CurrentIndex = songs.findIndex((song) =>song.id === currentSong.id);
    await setCurrentSong(songs[(CurrentIndex+1) % songs.length])
      if(isPlaying){
        audioRef.current.play();
      }
  
}
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
    <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
    <Song currentSong={currentSong} isPlaying={isPlaying}/>
    <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
    <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef}/>
    <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
