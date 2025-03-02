import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loader = ({ size = "2x" }: { size?: any }) => {
  return (
    <div className='w-full mt-36 flex justify-center items-center'>
      <FontAwesomeIcon
        icon={faCircleNotch}
        size={size || "2x"}
        className='animate-spin text-gray-400 p-0 m-0'
      />
    </div>
  );
};

export default Loader;
