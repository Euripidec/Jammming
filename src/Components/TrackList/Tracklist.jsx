import React from "react";
import './Tracklist.css';
import Track from "../Track/Track"
function Tracklist (props) {

    const renderAction = () => {
        if (props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }
    return (
        <div className="Tracklist">
            {props.userSearchResults.map(track => (
                <Track track={track} key={track.id}/>
            )
            )}
        </div>
    )
}

export default Tracklist