import React from "react";
import { useEffect } from "react";
import {
  getAllUsers,
  getAllAlbums,
  getAllSongs,
  getAllArtists,
} from "../../api";
import { actionType } from "../../context/reducer";

import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";

import { useStateValue } from "../../context/StateProvider";

export const DashboardCard = ({ icon, name, total }) => {
  return (
    <div
      style={{ backgroundColor: "gray" }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{total}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ users, songs, artists, albums }, dispatch] = useStateValue();
  useEffect(() => {
    if (users) {
      getAllUsers().then((users) => {
        dispatch({
          type: actionType.SET_USERS,
          users: users.data,
        });
      });
    }
    if (songs) {
      getAllSongs().then((songs) => {
        dispatch({
          type: actionType.SET_SONGS,
          songs: songs.data,
        });
      });
    }
    if (albums) {
      getAllAlbums().then((albums) => {
        dispatch({
          type: actionType.SET_ALBUMS,
          albums: albums.data,
        });
      });
    }
    if (artists) {
      getAllArtists().then((artists) => {
        dispatch({
          type: actionType.SET_ARTISTS,
          artists: artists.data,
        });
      });
    }
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      {/* prettier-ignore */}
      <DashboardCard icon={<FaUsers className="text-3xl text-textColor" />} name={"Users"} total={users?.length > 0 ? users?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiLoveSong className="text-3xl text-textColor" />} name={"Songs"} total={songs?.length > 0 ? songs?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor" />} name={"Artist"} total={artists?.length > 0 ? artists?.length : 0} />

      {/* prettier-ignore */}
      <DashboardCard icon={<GiMusicalNotes className="text-3xl text-textColor" />} name={"Album"} total={albums?.length > 0 ? albums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
