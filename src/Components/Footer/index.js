import React, { useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { Grid, Slider } from "@material-ui/core";
import { useSelectedTrack } from "../../context/useSelectedTrack";
import data from "../../mocks/data.json";

import "./footer.styles.css";

function Footer() {
  const { discover_weekly } = data;
  const {
    selectedTrack,
    selectedTrackIndex,
    nextTrack,
    previousTrack,
    setTrackIndex,
  } = useSelectedTrack();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const filteredTracks = discover_weekly.tracks.items.filter((item) => {
    const track = item.track;
    return track && !track.name.includes(".....");
  });

  const currentTrackIndex = selectedTrackIndex >= 0 ? selectedTrackIndex : 0;

  const currentTrack =
    currentTrackIndex < filteredTracks.length
      ? filteredTracks[currentTrackIndex].track
      : null;

  const playTrack = () => {
    if (currentTrack) {
      console.log("Playing track:", currentTrack.name, currentTrackIndex);
    }
  };

  const shuffleTracks = () => {
    const shuffledIndices = Array.from(
      { length: filteredTracks.length },
      (_, i) => i
    );

    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [
        shuffledIndices[j],
        shuffledIndices[i],
      ];
    }

    const nextIndex = shuffledIndices[0];

    if (nextIndex !== undefined) {
      setTrackIndex(nextIndex);
    }
  };

  const toggleShuffle = () => {
    if (isShuffle) {
      setIsShuffle(false);
    } else {
      setIsShuffle(true);
      setIsRepeat(false);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const nextTrackWithRepeat = () => {
    if (isRepeat) {
      if (selectedTrackIndex === filteredTracks.length - 1) {
        setTrackIndex(0);
      } else {
        nextTrack();
      }
    }
  };

  const previousTrackWithRepeat = () => {
    if (isRepeat) {
      if (selectedTrackIndex === 0) {
        setTrackIndex(filteredTracks.length - 1);
      } else {
        previousTrack();
      }
    }
  };

  useEffect(() => {
    playTrack();
  }, [selectedTrack]);

  return (
    <div className="footer">
      <div className="footer_body">
        <div className="footer_left">
          {currentTrack && currentTrack.album.images[0]?.url && (
            <img
              className="footer_albumLogo"
              src={currentTrack.album.images[0].url}
              alt={currentTrack.name}
            />
          )}
          <div className="footer_songInfo">
            <h2>
              {currentTrack ? currentTrack.name : "Please select a valid track"}
            </h2>
            <p>{currentTrack ? currentTrack.artists[0].name : ""}</p>
          </div>
        </div>
        <div className="footer_center">
          <ShuffleIcon
            className={isShuffle ? "footer_green" : ""}
            onClick={toggleShuffle}
          />
          <SkipPreviousIcon
            className="footer_icon"
            onClick={
              isRepeat
                ? previousTrackWithRepeat
                : isShuffle
                ? shuffleTracks
                : previousTrack
            }
          />
          <PlayCircleOutlineIcon
            fontSize="large"
            className="footer_icon"
            onClick={playTrack}
          />
          <SkipNextIcon
            className="footer_icon"
            onClick={
              isRepeat
                ? nextTrackWithRepeat
                : isShuffle
                ? shuffleTracks
                : nextTrack
            }
          />
          <RepeatIcon
            className={isRepeat ? "footer_green" : ""}
            onClick={toggleRepeat}
          />
        </div>
        <div className="footer_right">
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item xs>
              <Slider />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Footer;
