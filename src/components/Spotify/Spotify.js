const clientId = '2dab8992711b42bd94a0693cf0717888' ; 
const redirectUri = 'http://localhost:3000/'; 
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }


    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      console.log('Access token is not set.');
      return;
    }
  
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message))
    .then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  getUserId() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse.id;
    });
  },
  createPlaylist(userId, playlistName) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: playlistName })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse.id;
    });
  },
  addTracksToPlaylist(playlistId, trackURIs) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: trackURIs })
    });
  },
  
  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
  
    let userId;
    return Spotify.getUserId()
      .then(id => {
        userId = id;
        return Spotify.createPlaylist(userId, playlistName);
      })
      .then(playlistId => {
        return Spotify.addTracksToPlaylist(playlistId, trackURIs);
      });
  }
  
  
  
};

export default Spotify;
