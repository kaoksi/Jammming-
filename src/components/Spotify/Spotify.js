var client_id = 'a27a4fd792aa470ea2fd25a9c8df61bc'; // Your client id
var client_secret = '30fd0dc2464445d8a0048d2cc500925a'; // Your secret
var redirect_uri = 'http://localhost:3000/'; // Your redirect uri

const apiKey = '';
let accessToken;

const Spotify = {
  //85
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/search?type=track&q=${term}', {headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },


  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //79, 80
    const accessTokenSpotify = window.location.href.match(/access_token=([^&]*)/);
       const expiresInSpotify = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenSpotify && expiresInSpotify) {
      accessToken = accessTokenSpotify[1];
      const expiresInSpotify = expiresInSpotify[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`
      window.location = redirect;
    }
  },
  //90
  savePlaylist(playlistName, trackUris) {
//Inside the function, check if there are values saved to the method's two arguments. If not, return.
    if(!playlistName || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => {
      if (response.ok) {
        return response.json();
        }
      }
      ).then(jsonResponse => {
        const userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: trackUris})
      });
    });
  }
}

export default Spotify;
