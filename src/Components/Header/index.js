import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { useSelectedTrack } from "../../context/useSelectedTrack";
import SearchIcon from "@material-ui/icons/Search";
import data from "../../mocks/data.json";

import "./header.styles.css";

function Header() {
  const { discover_weekly } = data;

  const { trackList, setTracks } = useSelectedTrack();
  const [searchQuery, setSearchQuery] = useState("");
  const user = {};

  useEffect(() => {
    setTracks(
      discover_weekly.tracks.items.filter(
        (item) => item.track && !item.track.name.includes(".....")
      )
    );
  }, [searchQuery]);

  const handleSearch = () => {
    const filteredTracks = trackList.filter((track) =>
      track.track.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setTracks(filteredTracks);
  };

  return (
    <div className="header">
      <div className="header_left">
        <SearchIcon onClick={handleSearch} />
        <input
          placeholder="Search for Artists, Songs or Podcasts"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <div className="header_right">
        <Avatar src={user?.images?.[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
