import React from "react";
import "./songRow.styles.css";

function SongRow(props) {
  const { track, onClick, isSelected } = props;

  return (
    <div
      onClick={onClick}
      className={`songRow ${isSelected ? "songRow_selected" : ""}`}
    >
      <img
        className="songRow_album"
        src={track.album.images[0].url}
        alt={track.name}
      />
      <div className="songRow_info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
