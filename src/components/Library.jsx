import { motion, AnimatePresence } from "framer-motion";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  songs,
  libraryOpened,
  setCurrentSong,
  setLibraryOpened,
}) => {
  const libraryVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: "0",
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const songVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      {libraryOpened && (
        <motion.aside
          variants={libraryVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="library-container"
        >
          <motion.div className="library-nav">
            <motion.h1 className="library-title"> Library </motion.h1>
            <FontAwesomeIcon
              onClick={() => setLibraryOpened(!libraryOpened)}
              className="library-close"
              icon={faClose}
            />
          </motion.div>
          {songs.map((song) => (
            <motion.div key={song.id} variants={songVariants}>
              <LibrarySong setCurrentSong={setCurrentSong} song={song} />
            </motion.div>
          ))}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Library;
