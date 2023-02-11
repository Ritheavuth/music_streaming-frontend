import React, { useEffect, useState } from "react";
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { filterByLanguage, filters } from "../../utils/supportFunctions";
import FilterButtons from "./FilterButtons";
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// firebase
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { motion } from "framer-motion";

export default function DashboardNewSong() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [
    { artists, albums, artistFilter, albumFilter, filterTerm, languageFilter },
    dispatch,
  ] = useStateValue();
  // image
  const [songName, setSongName] = useState("");
  const [songImage, setSongImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // audio
  const [audioURL, setAudioURL] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  // artist
  const [artistImage, setArtistImage] = useState(null);
  const [artistUploadProgress, setArtistUploadProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);
  const [artistName, setArtistName] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  // album
  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadProgress, setAlbumUploadProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);
  const [albumName, setAlbumName] = useState("");

  useEffect(() => {
    if (artists) {
      getAllArtists().then((artists) => {
        dispatch({
          type: actionType.SET_ARTISTS,
          artists: artists.data,
        });
      });
    }
    if (albums) {
      getAllAlbums().then((albums) => {
        console.log(albums);
        dispatch({
          type: actionType.SET_ALBUMS,
          albums: albums.data,
        });
      });
    }
  }, []);

  const deleteFile = (url, isImage, block) => {
    const deleteRef = ref(storage, url);

    if (isImage && block === "song") {
      setIsUploading(true);
      deleteObject(deleteRef).then(() => {
        setSongImage(null);
        setIsUploading(false);
      });
    } else if (isImage && block === "artist") {
      setIsArtistUploading(true);
      deleteObject(deleteRef).then(() => {
        setArtistImage(null);
        setIsArtistUploading(false);
      });
    } else if (isImage && block === "album") {
      setIsAlbumUploading(true);
      deleteObject(deleteRef).then(() => {
        setAlbumImageCover(null);
        setIsAlbumUploading(false);
      });
    } else {
      setIsAudioLoading(true);
      deleteObject(deleteRef).then(() => {
        setAudioURL(null);
        setIsAudioLoading(false);
      });
    }
  };

  const saveSong = () => {
    if (!audioURL || !songName || !songImage || !languageFilter || !filterTerm) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
    } else {
      setIsAudioLoading(true);
      setIsUploading(true);

      const newSongData = {
        name: songName,
        imageURL: songImage,
        songURL: audioURL,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      saveNewSong(newSongData).then((res) => {
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_SONGS,
            songs: songs.data,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
      setSongName("");
      setIsAudioLoading(false);
      setIsUploading(false);
      setSongImage(null);
      setAudioURL(null);
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({
        type: actionType.SET_LANGUAGE_FILTER,
        languageFilter: null,
      });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    }
  };

  const saveArtist = () => {
    if (!artistImage || !artistName || !instagram || !facebook) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
    } else {
      setIsArtistUploading(true);
      const data = {
        name: artistName,
        imageURL: artistImage,
        facebook: `www.facebook.com/${facebook}`,
        instagram: `www.instagram.com/${instagram}`,
      };
      saveNewArtist(data).then((res) => {
        getAllArtists().then((artist) => {
          dispatch({
            type: actionType.SET_ARTISTS,
            artists: artist.data,
          });
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: "null",
            });
          }, 4000);
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
      setIsArtistUploading(false);
      setArtistName("");
      setInstagram("");
      setFacebook("");
      setArtistImage(null);
    }
  };

  const saveAlbum = () => {
    if (!albumImageCover || !albumName) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
    } else {
      setIsAlbumUploading(true);
      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };
      saveNewAlbum(data).then((res) => {
        getAllAlbums().then((album) => {
          dispatch({
            type: actionType.SET_ALBUMS,
            albums: album.data,
          });
        });
      });
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "null",
        });
      }, 4000);
      setIsAlbumUploading(false);
      setAlbumImageCover(null);
      setAlbumName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-400 gap-4 rounded-md">
      <p className="text-xl font-semibold text-headingColor">Song Details</p>
      <input
        type="text"
        placeholder="Song name"
        value={songName}
        onChange={(e) => {
          setSongName(e.target.value);
        }}
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-400 bg-transparent"
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={artists} flag={"Artist"} />
        <FilterButtons filterData={albums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filters} flag={"Category"} />
      </div>

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isUploading && <FileLoader progress={uploadProgress} />}
        {!isUploading && (
          <>
            {!songImage ? (
              <FileUploader
                updateState={setSongImage}
                setProgress={setUploadProgress}
                isLoading={setIsUploading}
                isImage={true}
              />
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img
                  src={songImage}
                  alt=""
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => {
                    deleteFile(songImage, true);
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioURL ? (
              <FileUploader
                updateState={setAudioURL}
                setProgress={setAudioUploadProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio src={audioURL} controls></audio>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => {
                    deleteFile(audioURL, false, "song");
                  }}
                >
                  <MdDelete className="text-white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {isUploading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="px-8 py-2 w-full rounded-md text-black bg-green-600"
            onClick={saveSong}
          >
            Save Song
          </motion.button>
        )}
      </div>

      <div className="w-full flex flex-row gap-3 justify-evenly">
        {/* artist uploader */}
        <div className="w-1/2 flex flex-col gap-2 items-center">
          <p className="text-xl font-semibold text-headingColor">
            Artist Details
          </p>

          <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isArtistUploading && (
              <FileLoader progress={artistUploadProgress} />
            )}
            {!isArtistUploading && (
              <>
                {!artistImage ? (
                  <FileUploader
                    updateState={setArtistImage}
                    setProgress={setArtistUploadProgress}
                    isLoading={setIsArtistUploading}
                    isImage={true}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={artistImage}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() => {
                        deleteFile(artistImage, true, "artist");
                      }}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Artist name */}

          <input
            type="text"
            placeholder="Artist name"
            value={artistName}
            onChange={(e) => {
              setArtistName(e.target.value);
            }}
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-400 bg-transparent"
          />

          {/* Facebook */}

          <div className="w-full flex items-center rounded-md p-3 border border-gray-300 ">
            <p className="text-base font-semibold text-gray-400">
              www.facebook.com/
            </p>
            <input
              type="text"
              placeholder="your facebook id"
              value={facebook}
              onChange={(e) => {
                setFacebook(e.target.value);
              }}
              className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
            />
          </div>
          {/* instagram */}

          <div className="w-full flex items-center rounded-md p-3 border border-gray-300 ">
            <p className="text-base font-semibold text-gray-400">
              www.instagram.com/
            </p>
            <input
              type="text"
              placeholder="your instagram id"
              value={instagram}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
              className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center justify-center w-60 p-4">
            {isArtistUploading ? (
              <DisabledButton />
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 w-full rounded-md text-black bg-green-600"
                onClick={saveArtist}
              >
                Save Artist
              </motion.button>
            )}
          </div>
        </div>

        {/* Album uploader */}
        <div className="w-1/2 flex flex-col gap-2 items-center">
          <p className="text-xl font-semibold text-headingColor">
            Album Details
          </p>

          <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isAlbumUploading && <FileLoader progress={albumUploadProgress} />}
            {!isAlbumUploading && (
              <>
                {!albumImageCover ? (
                  <FileUploader
                    updateState={setAlbumImageCover}
                    setProgress={setAlbumUploadProgress}
                    isLoading={setIsAlbumUploading}
                    isImage={true}
                  />
                ) : (
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={albumImageCover}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                      onClick={() => {
                        deleteFile(albumImageCover, true, "album");
                      }}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            type="text"
            placeholder="Album name"
            value={albumName}
            onChange={(e) => {
              setAlbumName(e.target.value);
            }}
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-400 bg-transparent"
          />
          <div className="flex items-center justify-center w-60 p-4">
            {isAlbumUploading ? (
              <DisabledButton />
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 w-full rounded-md text-black bg-green-600"
                onClick={saveAlbum}
              >
                Save Album
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const DisabledButton = () => {
  return (
    <button
      disabled
      type="button"
      className="px-8 py-2 w-full rounded-md text-black bg-green-600"
    >
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </button>
  );
};

export const FileUploader = ({
  updateState,
  setProgress,
  isLoading,
  isImage,
}) => {
  const uploadFile = (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);

    const storageRef = ref(
      storage,
      `${isImage ? "images" : "audio"}/${Date.now()}-${uploadedFile.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateState(downloadURL);
          isLoading(false);
        });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl ">
            <BiCloudUpload />
          </p>
          <p className="text-lg">{isImage ? "Upload Image" : "Upload Audio"}</p>
        </div>
      </div>
      <input
        type="file"
        name="upload-file"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        className={"w-0 h-0"}
        onChange={uploadFile}
      />
    </label>
  );
};

export const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{Math.round(progress)}%</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative"></div>
    </div>
  );
};
