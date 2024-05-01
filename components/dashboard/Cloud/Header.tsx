import React from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}
const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <div className="grid grid-cols-7 border-b ">
      <div className="p-2 flex items-center gap-3">
        <div className="text-[22px] ">
          <FaGoogleDrive />
        </div>
        <p>Quản lý file</p>
      </div>
      <div className="col-span-6 py-2 flex justify-between items-center">
        <div className="bg-gray-200 flex items-center rounded-md">
          <div className="text-[25px] py-1 px-2">
            <IoIosSearch />
          </div>
          <input
            type="Nhập từ khóa tìm kiếm..."
            className="p-2 bg-gray-200 outline-none min-w-[400px] rounded-r-md"
          />
        </div>
        <div className="text-[30px] mr-5" onClick={() => setIsOpen(false)}>
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};

export default Header;
