import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoTrash } from "react-icons/io5";
import {
  deleteAlbum,
  deleteArtist,
  deleteSong,
  getAllAlbums,
  getAllArtists,
  getAllSongs,
} from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { storage } from "../../config/firebase.config";
import { deleteObject, ref } from "firebase/storage";

export const DashboardSongCard = ({ data, index, type }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [
    { alertType, artists, songs, albums, isSongPlaying, songIndex },
    dispatch,
  ] = useStateValue();
  const deleteItem = (data) => {
    if (type === "song") {
      console.log(type);
      const imageRef = ref(storage, data.imageURL);
      const songRef = ref(storage, data.songURL);

      deleteObject(imageRef).then(() => {});
      deleteObject(songRef).then(() => {});

      deleteSong(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          getAllSongs().then((songs) => {
            dispatch({
              type: actionType.SET_SONGS,
              songs: songs.data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }

    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => {});

      deleteArtist(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          getAllArtists().then((artists) => {
            dispatch({
              type: actionType.SET_ARTISTS,
              artists: artists.data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }

    if (type === "album") {
      console.log(type);
      const deleteRef = ref(storage, data.imageURL);

      deleteObject(deleteRef).then(() => {});

      deleteAlbum(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          getAllAlbums().then((albums) => {
            dispatch({
              type: actionType.SET_ALBUMS,
              albums: albums.data,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "danger",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
  };
  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };
  return (
    <motion.div
      key={index}
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-700 shadow-md rounded-lg flex flex-col items-center"
      onClick={type === "song" && addToContext}
    >
      <motion.div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data?.imageURL}
          className="w-full h-full rounded-lg object-cover"
        />
      </motion.div>
      <p className="text-base text-center text-headingColor font-semibold my-2 justify-center">
        {data?.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
        <span className="block text-sm text-gray-400 my-1">
          {data?.artist?.length > 25
            ? `${data?.artist?.slice(0, 25)}...`
            : data?.artist}
        </span>
      </p>
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i
          className="text-base text-red-400 drop-shadow-md hover:text-red-600"
          onClick={() => {
            setIsDelete(true);
          }}
        >
          <IoTrash />
        </motion.i>
      </div>
      {isDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex-col bottom-2 right-2 absolute flex items-center justify-center gap-3 inset-0 backdrop-blur-md"
        >
          <p className="text-lg text-gray-600 font-semibold text-center">
            Are you sure?
          </p>
          <div className="flex items-center gap-4">
            <motion.button
              className="px-2 py-1 text-sm uppercase text-black bg-green-300 rounded-md hover:bg-green-500"
              whileTap={{ scale: 0.7 }}
              onClick={() => deleteItem(data)}
            >
              Yes
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm uppercase text-black bg-red-300 rounded-md hover:bg-red-500"
              whileTap={{ scale: 0.7 }}
              onClick={() => {
                setIsDelete(false);
              }}
            >
              No
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
