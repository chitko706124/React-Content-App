import React from "react";
import { TbMoodSad } from "react-icons/tb";

const Noresult = () => {
  return (
    <div className=" flex flex-col justify-center gap-2 p-10 items-center align-middle">
      <TbMoodSad className=" text-center text-[30px] text-gray-400" />
      <div className=" text-center text-2xl text-gray-400">No Result Found</div>
    </div>
  );
};

export default Noresult;
