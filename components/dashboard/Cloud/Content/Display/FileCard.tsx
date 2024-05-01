import Image from 'next/image';
import React from 'react';

const FileCard = () => {
  return (
    <div className="border rounded-md border-gray-300  hover:border-gray-500 duration-300 cursor-pointer bg-gray-100">
      <div className="px-3 w-full h-[150px]">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/comtamkim-25c88.appspot.com/o/Untitled.png?alt=media&token=d53095bf-3db6-4f4e-bb03-3a8ef92f4066"
          alt="file"
          width={400}
          height={400}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h3 className="truncate p-2 font-normal hover:text-black">
        comtamkim-25c88.appspot.com/o/Untitled.png?alt=media&t
      </h3>
    </div>
  );
};

export default FileCard;
