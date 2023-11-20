import React, { useState } from 'react';
import Spotify from '../Spotify/Spotify'; 

function SearchBar() {
  const [term, setTerm] = useState('');

  const search = () => {
    Spotify.search(term).then(searchResults => {
    
      console.log(searchResults);
    });
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
      <button onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;
