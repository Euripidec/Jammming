import React from "react";
import './SearchResults.css';
import Tracklist from "../TrackList/Tracklist"

function SearchResults (props) {
    return (
        <div className="SearchResults">
            <Tracklist userSearchResults={props.userSearchResults}/>
        </div>
    )
}

export default SearchResults