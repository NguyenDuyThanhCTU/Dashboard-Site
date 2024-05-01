'use client';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId, insertOne, updateOne } from '@lib/api';
import { notification } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CollectionFormProps {
  setIsOpen: (isOpen: boolean) => void;
  collectionLength: number;
}

const CollectionForm = ({
  setIsOpen,
  collectionLength,
}: CollectionFormProps) => {
  const { FormData, setFormData } = useStateProvider();
  const RadioItem = [
    {
      label: 'Hình ảnh',
      value: 'hinh-anh',
    },
    {
      label: 'Video',
      value: 'video',
    },
  ];
  const router = useRouter();
  const HandleSubmit = async (Type: string) => {
    const Data = { ...FormData, stt: collectionLength };
    if (Type === 'hinh-anh') {
      if (!FormData?.image) {
        notification.error({
          message: 'Vui lòng chọn hình ảnh',
        });
      } else {
        await insertAndCustomizeId(
          'Collections',
          Data,
          `${collectionLength ? 100000000000 + collectionLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    } else {
      if (!FormData?.video) {
        notification.error({
          message: 'Vui lòng nhập liên kết video',
        });
      } else if (!FormData?.title) {
        notification.error({
          message: 'Vui lòng nhập tiêu đề video',
        });
      } else if (!FormData?.image) {
        notification.error({
          message: 'Vui lòng chọn thumbnail video',
        });
      } else {
        await insertAndCustomizeId(
          'Collections',
          Data,
          `${collectionLength ? 100000000000 + collectionLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };

  const getVideoId = (url: string): string | null => {
    const match = url?.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|u\/\w\/|embed\/?\??(?:\w*=\w*)*)?([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  useEffect(() => {
    function checkUrl() {
      const videoId = getVideoId(FormData?.video);
      if (!videoId) {
        return;
      } else {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        if (embedUrl) {
          setFormData({ ...FormData, embedVideo: embedUrl });
        }
      }
    }
    checkUrl();
  }, [FormData?.video]);

  return (
    <div>
      <form className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
        <div className="w-full border bg-slate-200">
          <div className="p-3">
            <InputForm
              Label="Chon đối tượng liên kết"
              Type="Radio"
              field="type"
              Option={RadioItem}
            />
          </div>
        </div>
        {FormData?.type === 'hinh-anh' || FormData?.type === 'phu-tung' ? (
          <>
            <InputForm Label="Chọn hình ảnh" Type="Upload" field="image" />
          </>
        ) : (
          FormData?.type === 'video' && (
            <>
              <InputForm Label="Tiêu đề video" Type="Input" field="title" />
              <InputForm Label="Thumbnail video" Type="Upload" field="image" />
              <InputForm
                Label="Liên kết video youtube"
                Type="Input"
                field="video"
              />
              <div className=" flex justify-center mt-2">
                {FormData?.video ? (
                  <iframe
                    src={FormData?.embedVideo}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/congtyads-33180.appspot.com/o/360_F_472006716_sXPLGVS29LPVVkxkOmJylPXVfwdB4F3F.jpg?alt=media&token=4c614385-bfeb-44eb-a3f6-aafbe410e4e7"
                    alt="Video not found"
                    width={200}
                    height={200}
                  />
                )}
              </div>{' '}
            </>
          )
        )}
      </form>
      <>
        {' '}
        <div className="flex w-full justify-end mt-5 pt-3 border-t border-black">
          <div
            className={`${
              FormData?.type === undefined
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:bg-red-700 duration-300'
            } bg-red-500  text-white p-2 rounded-md`}
            onClick={() => HandleSubmit(FormData?.type)}
          >
            Thêm
          </div>
        </div>
      </>
    </div>
  );
};

export default CollectionForm;
