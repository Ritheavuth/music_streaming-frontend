import axios from "axios";

// const baseURL = "https://audify-music.cyclic.app"
const baseURL = "http://localhost:4000";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/user/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/user/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/song/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/artist/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/album/`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const updateUserRole = async (id, role) => {
  try {
    const res = await axios.put(`${baseURL}/api/user/${id}`, {
      data: { role: role },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteSpecificUser = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/user/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (song) => {
  try {
    const res = await axios.post(`${baseURL}/api/song/`, { ...song });
    return (await res).data.song;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (artist) => {
  try {
    const res = await axios.post(`${baseURL}/api/artist/`, { ...artist });
    return (await res).data.artist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (album) => {
  try {
    const res = await axios.post(`${baseURL}/api/album/`, { ...album });
    return (await res).data.album;
  } catch (error) {
    return null;
  }
};

export const deleteSong = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/song/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteArtist = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/artist/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};

export const deleteAlbum = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/api/album/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
