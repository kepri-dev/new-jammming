import React from "react";
import Track from '../Track/Track'

function SearchResults({ searchResults, onAdd }) {
  return (
    <div>
      {searchResults.map(track => (
        <Track key={track.id} track={track} onAdd={onAdd} />
      ))}
    </div>
  );
}


export default SearchResults;