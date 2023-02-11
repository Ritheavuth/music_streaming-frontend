import React from "react";
import { TiTick } from "react-icons/ti";
import { CgDanger } from "react-icons/cg";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
        initial={{translateX: 200, opacity: 0}}
        animate={{translateX: 0, opacity: 1}}
        exit={{translateX: 200, opacity: 0}}
      className={`fixed top-12 right-12 px-4 py-2 display-none rounded-md backdrop-blur-md flex items-center justify-center shadow-xl 
      ${type === "success" && "bg-green-700 text-white"}
      ${type === "danger" && "bg-red-700 text-white"}
    `}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-7">
          <TiTick className="text-xl text-white" />
          <p className="font-semibold text-md text-white">Data Saved</p>
        </div>
      )}

      {type === "danger" && (
        <div className="flex items-center justify-center gap-7">
          <CgDanger className="text-xl text-white" />
          <p className="font-semibold text-md text-white">
            Something went wrong
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
