import React from 'react';
import { FaFolder } from 'react-icons/fa';

const FolderCard = () => {
  return (
    <div className="border border-gray-300 rounded-md hover:border-gray-500 duration-300 cursor-pointer">
      <div className="py-2 px-3 flex items-center gap-3 text-gray-700 hover:text-black">
        <div className="text-[25px]">
          <FaFolder />
        </div>
        <p>Folder 1</p>
      </div>
    </div>
  );
};

export default FolderCard;
