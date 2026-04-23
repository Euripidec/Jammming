import React from "react";
import './SearchBar.css';

function SearchBar ({onSearch}) {
    return (
        <div className="SearchBar">
            <input type="text" placeholder="Enter a song, album, or artist"/>
            <button>SEARCH</button>
        </div>
    )
}

export default SearchBar