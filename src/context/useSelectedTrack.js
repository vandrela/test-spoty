import { useContext } from "react";
import { SelectedTrackContext } from "./SelectedTrackContext";

export const useSelectedTrack = () => useContext(SelectedTrackContext);
