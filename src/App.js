import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// components
import { Home, Login } from "./components";
import { Dashboard } from "./components";
// firebase
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === true
  );

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data.user,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", auth);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-green-300 flex justify-center items-center text-white">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          {user?.role === "admin" ? (
            <Route path="/dashboard/*" element={<Dashboard />} />
          ) : (
            <Route />
          )}
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
