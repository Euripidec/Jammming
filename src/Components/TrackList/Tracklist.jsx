import React from "react";
import './Tracklist.css';
import Track from "../Track/Track"

function Tracklist (props) {

    return (
        <div className="Tracklist">
            {props.userSearchResults.map(track => (
                <Track track={track} key={track.id} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove}/>
            )
            )}
        </div>
    )
}

export default Tracklist