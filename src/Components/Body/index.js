// Body.js

import React, { useEffect } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow";
import Header from "../Header";
import data from "../../mocks/data.json";
import { useSelectedTrack } from "../../context/SelectedTrackContext";

import "./body.styles.css";

function Body({ spotify }) {
  const { discover_weekly } = data;
  const {
    selectTrack,
    trackList,
    setTracks,
    selectedTrackIndex,
    setTrackIndex,
  } = useSelectedTrack();

  useEffect(() => {
    setTracks(
      discover_weekly.tracks.items.filter(
        (item) => item.track && !item.track.name.includes(".....")
      )
    );
  }, []);

  const playTrack = (track) => {
    const trackIndex = trackList.findIndex(
      (item) => item.track.name === track.name
    );

    selectTrack(track);
    setTrackIndex(trackIndex);
  };

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body_info">
        <img src={discover_weekly?.images[0]?.url} alt="" />
        <div className="body_infoText">
          <strong>Playlist</strong>
          <h2>Discover weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon className="body_shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {/* List of songs */}
        {trackList.map((item, index) => (
          <SongRow
            key={item.track.id}
            track={item.track}
            onClick={() => playTrack(item.track)}
            isSelected={selectedTrackIndex === index}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
