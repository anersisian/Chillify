import { useState, useRef, useEffect } from "react";

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data";
import "./styles/app.scss";
import { motion, useAnimation } from "framer-motion";

function App() {
  const controls = useAnimation();
  const [songs, setsongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryOpened, setLibraryOpened] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    console.log("libraryOpened", libraryOpened);
    controls.start({
      x: libraryOpened ? "10%" : "0",
    });
  }, [libraryOpened]);

  useEffect(() => {
    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });

    setsongs(newSongs);

    if (isPlaying) {
      let promise = audioRef.current.play();
      // to avoid the error: Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
      if (promise !== undefined) {
        promise

          .then((_) => {
            //loaded
          })
          .catch((error) => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
      }
    }
  }, [currentSong]);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    let song = songs[currentIndex];
    if (direction === "skip-forward") {
      song = songs[(currentIndex + 1) % songs.length];
    } else {
      song = songs[(currentIndex - 1 + songs.length) % songs.length];
    }

    setCurrentSong(song);
  };

  return (
    <>
      <motion.div animate={controls}>
        <Nav
          setLibraryOpened={setLibraryOpened}
          libraryOpened={libraryOpened}
        />
      </motion.div>
      <motion.div className="App" animate={controls}>
        <Song currentSong={currentSong} />
        <Player
          timeUpdateHandler={timeUpdateHandler}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          setCurrentSong={setCurrentSong}
          songs={songs}
          skipTrackHandler={skipTrackHandler}
        />

        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={() => skipTrackHandler("skip-forward")}
        />
      </motion.div>
      <Library
        libraryOpened={libraryOpened}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setLibraryOpened={setLibraryOpened}
      />
    </>
  );
}

export default App;
