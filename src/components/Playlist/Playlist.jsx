import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist(name, onNameChange, onSave) {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };
  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} value={name} onChange={handleNameChange}  />
      <TrackList />
      <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;
