import React, { createContext, useContext, useState } from "react";

export const SelectedTrackContext = createContext();

export const useSelectedTrack = () => useContext(SelectedTrackContext);

export const SelectedTrackProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [trackList, setTrackList] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const selectTrack = (track) => {
    setSelectedTrack(track);
  };

  const setTracks = (tracks) => {
    setTrackList(tracks);
  };

  const setTrackIndex = (index) => {
    setSelectedTrackIndex(index);
  };

  const nextTrack = () => {
    if (selectedTrackIndex < trackList.length - 1) {
      console.log("Next Track Index:", selectedTrackIndex + 1);
      setSelectedTrackIndex(selectedTrackIndex + 1);
      setSelectedTrack(trackList[selectedTrackIndex + 1]);
    }
  };

  const previousTrack = () => {
    if (selectedTrackIndex > 0) {
      console.log("Previous Track Index:", selectedTrackIndex - 1);
      setSelectedTrackIndex(selectedTrackIndex - 1);
      setSelectedTrack(trackList[selectedTrackIndex - 1]);
    }
  };

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
