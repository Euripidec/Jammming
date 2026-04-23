import React, {useState} from "react";
import  "./app.css"
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Playlist from "../Playlist/Playlist"



function App () {
  const [searchResults,setSearchResults] = useState([
    {
      name: "Example track name 1",
      artist: "Example track artist 1",
      album: 'example track album 1',
      id: 1,
    },
     {
      name: "Example track name 2",
      artist: "Example track artist 2",
      album: 'example track album 2',
      id: 2,
    },
    
    
  ])
  const [playlistName,setPlaylistName] = useState('Example Playlist Name')
  const [playlistTracks,setPlaylistTracks] = useState([
    {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album1',
      id: 3,
    },
     {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album1',
      id: 4,
    },
     {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album1',
      id: 5,
    }
  ])

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log('track already exists')
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  const removeTrack = (track) => {
    const exsistingTrack = playlistTracks.filter((t) => t.id !== track.id)
    setPlaylistTracks(exsistingTrack)
  }

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((t) => t.uri)
  }

  const search = (term) => {
    console.log(term)
  }
    return (
        <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={search}/>
          <div className="App-playlist">
            <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist}/>
          </div>
        </div>
      </div>
        );
}

export default App;