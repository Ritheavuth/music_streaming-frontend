import React, { useEffect } from "react";
import { getAllArtists } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { DashboardSongCard } from "./DashboardSongCard";

const DashboardArtists = () => {
  const [{ artists }, dispatch] = useStateValue();
  useEffect(() => {
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
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* Main Container */}

      <div className="relative w-full my-4 p-4 border border-gray-300 rounded-md">
      {artists.length !== 0 ? (
          <ArtistContainer data={artists} />
        ) : (
          <p className="text-gray-500">No Artists to display...</p>
        )}
      </div>
    </div>
  );
};

export const ArtistContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data &&
        data.map((artist, index) => (
          <DashboardSongCard data={artist} index={index} type="artist" />
        ))}
    </div>
  );
};

export default DashboardArtists;
