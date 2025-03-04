import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className='w-full pt-36 flex justify-center items-center'>
      <FontAwesomeIcon
        icon={faCircleNotch}
        size='2x'
        className='animate-spin text-gray-400 p-0 m-0'
      />
    </div>
  );
};

export default Loader;
