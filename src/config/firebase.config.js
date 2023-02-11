import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyD3yQ0RhZnRsnIKA8jVK1IrCSQlGE_kEmo",
  authDomain: "music-app-0001.firebaseapp.com",
  projectId: "music-app-0001",
  storageBucket: "music-app-0001.appspot.com",
  messagingSenderId: "779983292936",
  appId: "1:779983292936:web:faf1af78f72d0d7bfd1fbd",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
