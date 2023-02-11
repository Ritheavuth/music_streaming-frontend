import React from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import DashboardUserCard from "./DashboardUserCard";

const DashboardUsers = () => {
  const [{ users }, dispatch] = useStateValue();
  useEffect(() => {
    if (users) {
      getAllUsers().then((users) => {
        dispatch({
          type: actionType.SET_USERS,
          users: users.data,
        });
      });
    }
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* filters */}

      {/* tabular data form */}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/* table head */}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>

        {/* table body */}
        {users &&
          users.map((user, index) => (
            <DashboardUserCard data={user} index={index} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
