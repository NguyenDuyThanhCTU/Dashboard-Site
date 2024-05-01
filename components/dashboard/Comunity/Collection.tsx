'use client';
import { Modal, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { PiCardsLight } from 'react-icons/pi';
import { useStateProvider } from '@context/StateProvider';
import { MdSmartDisplay } from 'react-icons/md';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import { CollectionProps } from '@assets/TypeProps';
import { ImageCollectionBox, VideoCollectionBox } from './Collection/Display';
import CollectionForm from './Collection/CollectionHandle';

interface CollectionsProps {
  ImageFiltered: CollectionProps[];
  VideoFiltered: CollectionProps[];
  collectionLength: number;
}

const Collection = ({
  ImageFiltered,
  VideoFiltered,
  collectionLength,
}: CollectionsProps) => {
  const [isImage, setIsImage] = useState<CollectionProps[]>([]);
  const [isVideo, setIsVideo] = useState<CollectionProps[]>([]);
  const [isOpenModal, setIsAddModal] = useState<boolean>(false);
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const { FormData } = useStateProvider();
  const [currentPaginationImage, setCurrentPaginationImage] =
    useState<number>(1);
  const [currentPaginationVideo, setCurrentPaginationVideo] =
    useState<number>(1);

  const { setFormData } = useStateProvider();

  useEffect(() => {
    if (currentPaginationImage === 1) {
      setIsImage(ImageFiltered?.slice(0, 10));
    } else {
      setIsImage(
        ImageFiltered?.slice(
          (currentPaginationImage - 1) * 10,
          currentPaginationImage * 10
        )
      );
    }
  }, [currentPaginationImage]);

  useEffect(() => {
    if (currentPaginationVideo === 1) {
      setIsVideo(VideoFiltered?.slice(0, 10));
    } else {
      setIsVideo(
        VideoFiltered?.slice(
          (currentPaginationVideo - 1) * 10,
          currentPaginationVideo * 10
        )
      );
    }
  }, [currentPaginationVideo]);

  useEffect(() => {
    setIsImage(ImageFiltered?.slice(0, 10));
  }, [ImageFiltered]);

  useEffect(() => {
    setIsVideo(VideoFiltered?.slice(0, 10));
  }, [VideoFiltered]);

  const HandleOpenForm = (id: string) => {
    setIsUpdateModel(true);
    const sort = isVideo?.filter((item) => item.id === id);
    setFormData(sort[0]);
  };

  return (
    <div className="w-full  p:px-0 d:px-10 font-light gap-10 min-h-screen  bg-white py-10">
      <div className="flex items-center gap-5 d:flex-row p:flex-col">
        <div>
          <h3 className="text-[30px] font-bold">Bộ Sưu Tập</h3>
        </div>
        <div>
          <CRUDButton
            Clicked={setIsAddModal}
            Label="Thêm"
            value=""
            Style="hover:bg-pink-900 bg-pink-700"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 gap-5 min-h-screen">
        <div className="bg-gray-50 border rounded-lg">
          <div className="p-3">
            <div className="flex items-center gap-4 text-[14px] mr-20">
              <div className="flex items-center gap-1">
                <PiCardsLight />
                <p>{isImage?.length} Hình ảnh</p>
              </div>
            </div>
            <div className="font-LexendDeca font-light">
              {' '}
              <ImageCollectionBox Data={isImage} />
            </div>
            <div className="w-full justify-end flex mt-4 mr-2">
              {ImageFiltered?.length > 10 && (
                <Pagination
                  current={currentPaginationImage}
                  onChange={(page) => setCurrentPaginationImage(page)}
                  total={ImageFiltered?.length}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border rounded-lg">
          <div className="p-3">
            <div className="flex items-center gap-4 text-[14px]">
              <div className="flex items-center gap-1">
                <MdSmartDisplay />
                <p>{isVideo?.length} Collection</p>
              </div>
            </div>
            <div className="font-LexendDeca font-light">
              <VideoCollectionBox Data={isVideo} setIsOpen={HandleOpenForm} />
              <div className="w-full justify-end flex mt-4 mr-2">
                {VideoFiltered?.length > 10 && (
                  <Pagination
                    current={currentPaginationVideo}
                    onChange={(page) => setCurrentPaginationVideo(page)}
                    total={VideoFiltered?.length}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm vào bộ sưu tập"
        open={isOpenModal}
        onCancel={() => setIsAddModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <CollectionForm
          collectionLength={collectionLength}
          setIsOpen={setIsAddModal}
        />
      </Modal>
      <Modal
        footer={null}
        title="Thêm vào bộ sưu tập"
        open={isUpdateModel}
        onCancel={() => setIsUpdateModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <CollectionForm
          collectionLength={FormData?.stt}
          setIsOpen={setIsUpdateModel}
        />
      </Modal>
    </div>
  );
};

export default Collection;
