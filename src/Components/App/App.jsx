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
      id: 1,
    },
     {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album1',
      id: 2,
    },
     {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album1',
      id: 3,
    }
  ])

  const addTrack = (track) => {
    searchResults.find(t => t.id === track.id)
  }
    return (
        <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          
          <div className="App-playlist">
            <SearchResults userSearchResults={searchResults}/>
            <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
          </div>
        </div>
      </div>
        );
}

export default App;