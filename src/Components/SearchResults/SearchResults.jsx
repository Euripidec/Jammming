import React from "react";
import './SearchResults.css';
import Tracklist from "../TrackList/Tracklist"

function SearchResults (props) {
    return (
        <div className="SearchResults">
            <Tracklist 
            userSearchResults={props.userSearchResults} 
            isRemoval={false} 
            onAdd={props.onAdd}
            />
        </div>
    )
}

export default SearchResults