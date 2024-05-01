import { useStateProvider } from '@context/StateProvider';
import { Drawer } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoListSharp } from 'react-icons/io5';
import { DashboardHeaderItems } from '../items';
import { FaCaretRight } from 'react-icons/fa';

const MobileUI = () => {
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<number>(0);
  const { HandleNavigate } = useStateProvider();
  const HandleNavigateMB = (url: string) => {
    setOpen(false);
    HandleNavigate(url);
  };
  return (
    <div className="d:hidden p:block bg-mainNormalBlue ">
      <div className="h-[84px] fixed z-50 w-full top-0 bg-white  text-black shadow-xl">
        <div className="px-4 w-full flex justify-between items-center">
          <Link href={`/`} className="h-[84px] w-[130px]">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/ads-company-285a6.appspot.com/o/ADS.png?alt=media&token=e8ebc77d-d9b8-4bdf-9052-a484b53909e3"
              alt="Logo"
              width={150}
              height={84}
              className="w-full h-full p-2"
            />
          </Link>
          <div className="border-2 rounded-xl border-gray-500">
            <div
              className="text-[25px] bg-gray-100 p-2 rounded-xl"
              onClick={() => setOpen(true)}
            >
              <IoListSharp />
            </div>
          </div>
        </div>

        <Drawer
          placement="left"
          closable={false}
          width={300}
          onClose={() => setOpen(false)}
          open={open}
        >
          <div className=" ">
            <div onClick={() => HandleNavigateMB('/')} className="p-5">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ads-company-285a6.appspot.com/o/ADS.png?alt=media&token=e8ebc77d-d9b8-4bdf-9052-a484b53909e3"
                alt="logo"
              />
            </div>

            <div>
              <div className="flex flex-col mt-2 font-LexendDeca font-light">
                {DashboardHeaderItems.map((item, idx) => (
                  <div key={idx}>
                    <div
                      className={`${
                        idx + 1 === isSelected ? 'text-red-500 ' : 'text-black'
                      } cursor-pointer border-b  py-2 flex justify-between items-center`}
                      onClick={() => setIsSelected(idx + 1)}
                    >
                      <div
                        onClick={() =>
                          HandleNavigateMB(`/admin?tab=${item.value}`)
                        }
                      >
                        {item.label}
                      </div>
                      {item?.children.length > 0 && (
                        <FaCaretRight
                          className={`${
                            idx + 1 === isSelected ? 'rotate-90 ' : 'rotate-0'
                          } duration-300`}
                        />
                      )}
                    </div>
                    {item?.children.length > 0 && (
                      <div
                        className={`flex flex-col gap-2 py-2 ml-4 duration-300 ${
                          idx + 1 === isSelected ? 'h-max ' : 'hidden'
                        }`}
                      >
                        {item?.children.map((child, idx) => (
                          <div
                            onClick={() =>
                              HandleNavigateMB(`/admin?tab=${child.value}`)
                            }
                            key={idx}
                            className="cursor-pointer"
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div
                  onClick={() => HandleNavigateMB(`/`)}
                  className="cursor-pointer border-b hover:text-red-500 duration-300 py-2"
                >
                  Thoát
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileUI;
