'use client';

import { introductoryProps } from '@assets/TypeProps';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { updateOne } from '@lib/api';
import { Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostIntroductory = ({ Data }: { Data: introductoryProps }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setFormData, FormData } = useStateProvider();
  const router = useRouter();

  const HandleSubmit = () => {
    setFormData({ ...FormData, level0: 'Introductory' });
    updateOne('Posts', 'introductory', FormData).then(() => {
      setIsOpenModal(false);
      router.refresh();
    });
  };

  useEffect(() => {
    setFormData(Data);
  }, [isOpenModal]);

  return (
    <div className="w-full px-2 font-light gap-10 min-h-screen  bg-white py-10 ">
      <div className="flex items-center gap-5 ml-5 d:flex-row p:flex-col">
        <div>
          <h3 className="text-[30px] font-bold">Chỉnh sửa bài giới thiệu</h3>
          <p className="font-light">
            giúp người dùng hiểu rõ hơn về công ty của bạn
          </p>
        </div>
        <div>
          <CRUDButton
            Clicked={setIsOpenModal}
            Label="Chỉnh Sửa"
            value="bài giới thiệu"
            Style="hover:bg-cyan-900 bg-cyan-700"
          />
        </div>
      </div>
      <div className="  grid p:grid-cols-1 d:grid-cols-4 gap-5 mt-10">
        <div className="col-span-3 border rounded-lg bg-slate-100 min-h-screen">
          <div className="p-5">
            <div
              className="ck-content"
              dangerouslySetInnerHTML={
                Data?.content
                  ? { __html: Data.content }
                  : {
                      __html: `<div><p>Chưa có dữ liệu để hiển thị</p> <p>Vui lòng chọn <strong> "Chỉnh sửa bài giới thiệu"  </strong> để cập nhật bài giới thiệu cho website!</p>  </div> `,
                    }
              }
            ></div>
          </div>
        </div>
        <div className="border shadow-sm bg-white rounded-md border-gray-200 ">
          <div className="p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 font-bold text-[18px]">
              <p>Ảnh bìa:</p>
            </div>
            <div className="relative mt-2  h-[150px] w-[150px]">
              {Data?.image !== undefined ? (
                <Image
                  src={
                    Data?.image
                      ? Data?.image
                      : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                  }
                  layout="fill"
                  objectFit="cover"
                  alt="Picture of the author"
                />
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  <p>Chưa có dữ liệu</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 font-bold text-[18px]">
              <p>Giới thiệu ngắn gọn:</p>
            </div>
            <div className="bg-cyan-50 rounded-lg">
              <div className="p-2">
                {Data?.shortDescription !== undefined ? (
                  <p>{Data?.shortDescription}</p>
                ) : (
                  <p>Chưa có dữ liệu</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        footer={null}
        title="Chỉnh sửa bài giới thiệu"
        open={isOpenModal}
        width={1200}
        onCancel={() => setIsOpenModal(false)}
        afterClose={() => setFormData({})}
        destroyOnClose={true}
      >
        <form className="flex flex-col gap-3 overflow-y-auto h-[60vh] justify-between relative">
          <div className="overflow-y-auto mb-20 scrollbar-thin">
            <div>
              <div className="flex flex-col gap-2">
                {' '}
                <InputForm
                  Label="Mô tả ngắn gọn"
                  Type="Input"
                  field="shortDescription"
                />
                <InputForm Label="Ảnh bìa" Type="Upload" field="image" />
              </div>
              <div className="flex flex-col gap-2"></div>
            </div>
            <InputForm
              Label="Nội dung bài giới thiệu"
              Type="Editor"
              field="content"
            />
          </div>
          <div className="flex w-full justify-end mt-5 pt-3 border-t border-black absolute bottom-0 bg-white">
            <div
              className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white p-2 rounded-md"
              onClick={() => HandleSubmit()}
            >
              Cập nhật
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PostIntroductory;
