import React from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

const Detail = () => {
  return (
    <div>
      <div className="p-2 flex justify-between items-center border-b font-bold">
        <div className="">Folder</div>
        <div className="flex items-center gap-1 mr-10">
          <p>Tên</p>
          <div>
            <FaArrowDownLong />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
