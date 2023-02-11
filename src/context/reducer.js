export const actionType = {
  SET_USER: "SET_USER",
  SET_USERS: "SET_USERS",
  SET_SONGS: "SET_SONGS",
  SET_ARTISTS: "SET_ARTISTS",
  SET_ALBUMS: "SET_ALBUMS",
  // Filter Types
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  // Alert
  SET_ALERT_TYPE: "SET_ALERT_TYPE",
  // Song playing
  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_SONG_INDEX: "SET_SONG_INDEX",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case actionType.SET_SONGS:
      return {
        ...state,
        songs: action.songs,
      };
    case actionType.SET_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      };
    case actionType.SET_ARTISTS:
      return {
        ...state,
        artists: action.artists,
      };
    // Filter Case
    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
    case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };
    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };
    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
    case actionType.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };
    case actionType.SET_IS_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };
    case actionType.SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };
    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    default:
      return state;
  }
};

export default reducer;
