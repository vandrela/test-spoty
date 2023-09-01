import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "../SidebarOption/index";
import data from "../../mocks/data.json";
import "./sidebar.styles.css";

function Sidebar() {
  const { playlists } = data;

  const sidebarOptions = [
    { key: "Home", Icon: HomeIcon, title: "Home" },
    { key: "Search", Icon: SearchIcon, title: "Search" },
    { key: "Your Library", Icon: LibraryMusicIcon, title: "Your Library" },
  ];

  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify Logo"
      />
      {sidebarOptions.map((option) => (
        <SidebarOption
          key={option.key}
          Icon={option.Icon}
          title={option.title}
        />
      ))}
      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists.items.map((playlist) => (
        <SidebarOption key={playlist.id} title={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
