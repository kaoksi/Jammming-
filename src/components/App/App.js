import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});
      }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
    savedTrack.id === track.id)) {
      let tracks = this.state.playlistTracks;
      tracks.pop(track);
      this.setState({playlistTracks: tracks});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //63 still need to do
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }


  //67s
  search(term) {
    //87
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks
      })
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
           <SearchBar
              onSearch={this.search}
           />
          <div className="App-playlist">
           <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
           />
           <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
