import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Logo } from "../assets/img/index";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";

import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [popOver, setPopOver] = useState(false);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", false);
        dispatch({
          type: actionType.SET_IS_SONG_PLAYING,
          isSongPlaying: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-md">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-md">
          <NavLink
            to={"/songs"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Songs
          </NavLink>
        </li>
        <li className="mx-5 text-md">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-md">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => {
          setPopOver(true);
        }}
        onMouseLeave={() => {
          setPopOver(false);
        }}
      >
        <img
          src={user?.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-md hover:text-headingColor font-semibold">
            {user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium Member.{" "}
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>

        {popOver && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 p-3 right-0 w-275 gap-2 bg-card shadow=lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/Profile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Favourites
            </p>

            <hr />

            {user?.role === "admin" && (
              <NavLink to={"/dashboard"}>
                <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                  Dashboard
                </p>
              </NavLink>
            )}

            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
