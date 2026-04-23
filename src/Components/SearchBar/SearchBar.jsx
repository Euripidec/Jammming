import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");
  const passTerm = () => {
    props.onSearch(term);
  };
  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Enter a song, album, or artist"
        onChange={handleTermChange}
      />
      <button className="SearchButton " onClick={passTerm}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
