
import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Playlists from '../Playlists/playlists';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {searchResults: [],
                  playlistName: "My Playlist",
                  playlistTracks:[],
                  playlists: []};


    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(plTracks => plTracks.id === track.id)) {
      return;
    }
      tracks.push(track);
      this.setState({playlistTracks: tracks});

  }

  removeTrack (track) {
    let tracks = this.state.playlistTracks; 
    tracks = tracks.filter(songs => track.id !== songs.id);


    this.setState({playlistTracks: tracks});

  }
  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }
  savePlaylist () {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }
  search(term) {
    Spotify.search(term).then(SearchResults =>{
      this.setState({searchResults: SearchResults})
    })
  }
  getPlaylists() {
    Spotify.getPlaylists().then(Playlists =>{
      this.setState({playlists: Playlists})
    })
  }
  render () {
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div  className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
      <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      <Playlists results={this.state.playlists} yourPlaylists={this.getPlaylists}/>
    </div>
  </div>
</div>
    )
  }
}

export default App;
