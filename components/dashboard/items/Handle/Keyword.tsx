'use client';
import { useStateProvider } from '@context/StateProvider';
import React, { useState } from 'react';
import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const HandleKeyword = () => {
  const [Keyword, setKeyword] = useState<string>('');
  const { FormData, setFormData } = useStateProvider();
  const HandleChangeKeyword = (item: number) => {
    let newKeyword = FormData?.Keyword?.filter((i: any) => i !== item);
    setFormData({ ...FormData, Keyword: newKeyword });
  };
  return (
    <div className="border rounded-xl border-black">
      <div className="p-2 flex flex-col">
        <div className="grid grid-cols-7 mt-2">
          <div>Từ khóa SEO:</div>
          <div className="col-span-6">
            <div className=" pl-2 py-2 flex flex-wrap gap-2">
              {FormData?.Keyword?.length > 0 && (
                <>
                  {FormData?.Keyword?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="border bg-slate-200 rounded-full relative"
                    >
                      <div className="w-max py-1 px-3">{item}</div>
                      <div
                        className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                        onClick={() => HandleChangeKeyword(item)}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="grid grid-cols-8  items-center  w-full justify-between  ">
            <div className="col-span-2 flex items-center gap-2 ">
              <p>Thêm từ khóa</p>
            </div>
            <div className="px-4 py-1 border flex justify-between items-center   bg-white rounded-lg w-full col-span-6">
              <input
                type="text"
                className=" outline-none w-full"
                value={Keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div
                className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                onClick={() => {
                  if (FormData.Keyword === undefined) {
                    setFormData({ ...FormData, Keyword: [Keyword] });
                    setKeyword('');
                  } else {
                    setFormData({
                      ...FormData,
                      Keyword: [...FormData?.Keyword, Keyword],
                    });
                    setKeyword('');
                  }
                }}
              >
                <MdUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleKeyword;
