import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import FolderCard from './Display/FolderCard';
import FileCard from './Display/FileCard';

const Display = () => {
  return (
    <div className="col-span-4">
      <div className="p-2 flex justify-between items-center border-b font-bold">
        <div className="">Folder</div>
        <div className="flex items-center gap-1 mr-10">
          <p>Tên</p>
          <div>
            <FaArrowDownLong />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 my-4 px-2">
        <FolderCard />
        <FolderCard />
        <FolderCard />
        <FolderCard />
        <FolderCard />
        <FolderCard />
      </div>

      <div className="p-2 flex justify-between items-center border-b font-bold">
        <div className="">Folder</div>
        <div className="flex items-center gap-1 mr-10">
          <p>Tên</p>
          <div>
            <FaArrowDownLong />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 my-4 px-2">
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
      </div>
    </div>
  );
};

export default Display;
