import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { RiPlayListFill } from "react-icons/ri";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { IoClose } from "react-icons/io5";

export default function MusicPlayer() {
  const nextTrack = () => {
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: (songIndex + 1) % songs.length,
    });
  };
  const prevTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songs.length - 1,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: (songIndex - 1) % songs.length,
      });
    }
  };
  const closePlayer = () => {
    dispatch({
      type: actionType.SET_IS_SONG_PLAYING,
      isSongPlaying: false,
    });
  };
  const [{ songs, songIndex, isSongPlaying }, dispatch] = useStateValue();
  const [isPLayList, setIsPlaylist] = useState(false);
  return (
    <div className="w-full bg-gray-700 flex items-center gap-3">
      <div className="w-full flex flex-row items-center gap-3 p-4 relative">
        <img
          src={songs[songIndex]?.imageURL}
          alt=""
          className="w-40 h-20 object-cover rounded-md
        "
        />

        <div className="flex items-start flex-col">
          <p className="text-xl text-gray-300 font-semibold">
            {`${
              songs[songIndex]?.name.length > 20
                ? songs[songIndex]?.name.slice(0, 20)
                : songs[songIndex]?.name
            }`}
          </p>
          <p className="text-textColor">{songs[songIndex]?.artist}</p>

          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setIsPlaylist(!isPLayList);
            }}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={songs[songIndex]?.songURL}
            onPlay={() => console.log("Is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={prevTrack}
          />
        </div>
        {isPLayList && <PlayListCard />}
      </div>
      <IoClose
        className="absolute top-0 right-0 my-2 mx-2"
        onClick={closePlayer}
      />
    </div>
  );
}

export const PlayListCard = () => {
  const [{ songs, songIndex, isSongPlaying }, dispatch] = useStateValue();

  useEffect(() => {
    if (!songs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_SONGS,
          songs: data.songs,
        });
      });
    }
  }, []);

  const setCurrentPlaySong = (index) => {
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
    <div className="absolute bg-gray-600 z-50 left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md">
      {songs.length > 0 ? (
        songs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setCurrentPlaySong(index)}
            key={index}
          >
            <img
              src={music?.imageURL}
              alt=""
              className="w-12 h-12 min-w-[44px] object-cover rounded-md"
            />
            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}
              </p>
              <p className="text-textColor">
                {`${
                  music?.artist.length > 20
                    ? music?.artist.slice(0, 20)
                    : music?.artist
                }`}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
