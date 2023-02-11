import React, {useEffect} from "react";
import { getAllAlbums } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { DashboardSongCard } from "./DashboardSongCard";

const DashboardAlbums = () => {
  const [{ albums }, dispatch] = useStateValue();
  useEffect(() => {
    if (albums) {
      getAllAlbums().then((albums) => {
        dispatch({
          type: actionType.SET_ALBUMS,
          albums: albums.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* Main Container */}

      <div className="relative w-full my-4 p-4 border border-gray-300 rounded-md">
      {albums.length !== 0 ? (
          <AlbumContainer data={albums} />
        ) : (
          <p className="text-gray-500">No Albums to display...</p>
        )}
      </div>
    </div>
  );
};

export const AlbumContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((artist, index) => <DashboardSongCard data={artist} index={index} type="album" />)}
    </div>
  );
};

export default DashboardAlbums