const LibrarySong = ({ song, setCurrentSong }) => {
  return (
    <div
      onClick={() => setCurrentSong(song)}
      className={`library-song-container ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt="song cover" />

      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
