import React, { useState, useCallback } from "react";
import { SelectedTrackContext } from "./SelectedTrackContext";

export const SelectedTrackProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const selectTrack = useCallback((track) => {
    setSelectedTrack(track);
  }, []);

  const setTracks = useCallback((tracks) => {
    setTrackList(tracks);
  }, []);

  const setTrackIndex = useCallback((index) => {
    setSelectedTrackIndex(index);
  }, []);

  const nextTrack = useCallback(() => {
    if (selectedTrackIndex < trackList.length - 1) {
      console.log("Next Track Index:", selectedTrackIndex + 1);
      setSelectedTrackIndex((prevIndex) => prevIndex + 1);
      setSelectedTrack(trackList[selectedTrackIndex + 1]);
    }
  }, [selectedTrackIndex, trackList]);

  const previousTrack = useCallback(() => {
    if (selectedTrackIndex > 0) {
      console.log("Previous Track Index:", selectedTrackIndex - 1);
      setSelectedTrackIndex((prevIndex) => prevIndex - 1);
      setSelectedTrack(trackList[selectedTrackIndex - 1]);
    }
  }, [selectedTrackIndex, trackList]);

  return (
    <SelectedTrackContext.Provider
      value={{
        selectedTrack,
        selectTrack,
        trackList,
        setTracks,
        selectedTrackIndex,
        setTrackIndex,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </SelectedTrackContext.Provider>
  );
};
