import React from 'react';
import Track from '../Track/Track';

const tracks = [
  { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  { id: 3, title: 'Track 3', artist: 'Artist 3', album: 'Album 3' },
  { id: 4, title: 'Track 4', artist: 'Artist 4', album: 'Album 4' },
];

function TrackList() {
  return (
    <div className="TrackList">
      {tracks.map((track) => (
        <Track key={track.id} title={track.title} artist={track.artist} album={track.album} />
      ))}
    </div>
  );
}

export default TrackList;

