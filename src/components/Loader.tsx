import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className='w-full pt-36 flex justify-center items-center'>
      <LoaderCircle className='animate-spin text-gray-400 p-0 m-0' />
    </div>
  );
};

export default Loader;
