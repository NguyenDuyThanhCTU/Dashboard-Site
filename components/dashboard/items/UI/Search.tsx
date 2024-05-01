import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { IoSearchSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const Search = ({ Data, Select, Field }: any) => {
  const [search, setSearch] = useState('');
  const [searchRs, setSearchRs] = useState([]);

  useEffect(() => {
    const sort = Data?.filter((SearchRS: any) =>
      SearchRS[Field]?.toLowerCase().includes(search.toLowerCase())
    );
    setSearchRs(sort);
  }, [Data, search]);

  return (
    <div className=" relative   text-[13px]">
      <div className="border rounded-lg border-gray-500 bg-gray-100">
        <div className="py-2 px-4 flex items-center gap-2">
          <div className="cursor-pointer">
            <IoSearchSharp />
          </div>
          <input
            type="text"
            className="outline-none bg-gray-100"
            placeholder="Tìm kiếm "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-5">
            <div
              className={`${
                search ? 'block' : 'hidden'
              }  bg-gray-500 text-gray-300 w-max p-1 rounded-full text-[10px] cursor-pointer`}
              onClick={() => setSearch('')}
            >
              <RxCross2 />
            </div>
          </div>
        </div>
      </div>
      {search && (
        <div className="absolute w-full bg-gray-100 top-full flex flex-col shadow-2xl z-50  border border-solid  rounded-lg  ">
          <div className=" flex flex-col max-h-[200px] overflow-y-auto scrollbar-thin">
            {searchRs?.slice(0, 5).map((searchItems: any, idx: number) => (
              <>
                {searchItems?.image ? (
                  <div
                    key={idx}
                    className="cursor-pointer p-2 hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => Select(searchItems.id, 'update')}
                  >
                    <div className="w-10 h-10">
                      <Image
                        src={
                          searchItems.image
                            ? searchItems.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt="search rs"
                        width={50}
                        height={50}
                        className="w-full h-full object-center object-contain"
                      />
                    </div>
                    <div className="p-1 font-normal ">{searchItems[Field]}</div>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="cursor-pointer p-2 hover:bg-gray-200 flex items-center gap-2"
                    onClick={() => Select(searchItems.id, 'update')}
                  >
                    <div className="text-[20px] text-gray-400">
                      <IoIosSearch />
                    </div>
                    <div className="p-1 font-normal ">{searchItems[Field]}</div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
