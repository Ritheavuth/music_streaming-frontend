import React, { useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { useStateValue } from "../../context/StateProvider";
import { deleteSpecificUser, getAllUsers, updateUserRole } from "../../api";
import { actionType } from "../../context/reducer";
import { MdDelete } from "react-icons/md";

export default function DashboardUserCard({ data, index }) {
  const createdAt = moment(new Date(data?.createdAt)).format("MMMM Do YYYY");

  const [{ user, users }, dispatch] = useStateValue();
  const [isUpdated, setIsUpdated] = useState(false);

  const updateRole = (id, role) => {
    updateUserRole(id, role).then((res) => {
      setIsUpdated(false);
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_USERS,
            users: data.data,
          });
        });
      }
    });
  };

  const deleteUser = (id) => {
    deleteSpecificUser(id).then((res) => {
      if (res) {
        getAllUsers().then(data => {
          dispatch({
            type: actionType.SET_USERS,
            users: data.data
          })
        })
      }
    })
  };

  return (
    <motion.div
      key={index}
      className="relative w-full rounded-md flex items-center justify-between py-4 cursor-pointer hover:bg-card hover:shadow-md"
    >
      {data._id !== user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-500"
          onClick={() => {
            deleteUser(data._id);
          }}
        >
          <MdDelete className="text-xl text-red-400 hover:text-red-500" />
        </motion.div>
      )}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        {/* prettier-ignore */}
        <img src={data.imageURL} alt="" className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verified ? 'True' : 'False'}</p>
      {/* prettier-ignore */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{createdAt}</p>

      <div className="w-275 min-w-[160] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center">{data.role}</p>

        {data._id !== user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="text-[10px] font-semibold text-textColor px-1 bg-gray-200 rounded-sm hover:shadow-md"
            onClick={() => setIsUpdated(true)}
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}

        {isUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-gray-700 shadow-xl rounded-md"
          >
            <p className="text-textColor text-[12px] font-semibold">
              Are you sure you want to mark the user as{" "}
              <span>{data?.role === "admin" ? "member" : "admin"} ?</span>
            </p>

            <div className="flex flex-row items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-noneborder-none text-sm px-4 py-1 rounded-md bg-green-500 text-black hover:shadow-md"
                onClick={() => {
                  updateRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  );
                }}
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-500 text-black hover:shadow-md"
                onClick={() => {
                  setIsUpdated(false);
                }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
