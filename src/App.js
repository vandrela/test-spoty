import React from "react";
import Player from "./Components/Player";
import { SelectedTrackProvider } from "./context/SelectedTrackProvider";

import "./App.css";

function App() {
  return (
    <div className="app">
      <SelectedTrackProvider>
        <Player />
      </SelectedTrackProvider>
    </div>
  );
}

export default App;
