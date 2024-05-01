'use client';

import { Modal } from 'antd';
import React, { useState } from 'react';
import { PiCardsLight } from 'react-icons/pi';
import { useStateProvider } from '@context/StateProvider';

import CRUDButton from '@components/items/admin/UI/CRUDButton';
import { PostProps, ProductProps, SlideProps } from '@assets/TypeProps';
import SlideHandle from './Slide/SlideHandle';
import SlideBox from './Slide/Display';

interface SlidesProps {
  Data: SlideProps[];
  PostsData: PostProps[];
  ProductsData: ProductProps[];
}

const Slide = ({ Data, PostsData, ProductsData }: SlidesProps) => {
  const [isAddModel, setIsAddModel] = useState(false);
  const [isUpdateModel, setIsUpdateModel] = useState(false);
  const { setFormData, FormData } = useStateProvider();

  const HandleSelected = (id: string) => {
    setIsUpdateModel(true);
    const sort = Data?.filter((item: any) => item.id === id);
    if (sort) {
      setFormData(sort[0]);
    }
  };

  return (
    <div className="w-full p:px-0 d:px-10 font-light gap-10 min-h-[90vh] bg-white py-10">
      <div className="flex items-center gap-5 d:flex-row p:flex-col">
        <div>
          <h3 className="text-[30px] font-bold">Danh sách slide giới thiệu</h3>
        </div>
        <div>
          <CRUDButton
            Clicked={setIsAddModel}
            Label="Thêm"
            value="Slide"
            Style="hover:bg-pink-900 bg-pink-700"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 mt-10 gap-5 ">
        <div className="bg-gray-50 border rounded-lg col-span-3 ">
          <div className="p-3">
            <div className="flex items-center gap-4 text-[14px] mr-20">
              <div className="flex items-center gap-1">
                <PiCardsLight />
                <p>{Data?.length} slide</p>
              </div>
            </div>
            <div className="font-LexendDeca font-light">
              <SlideBox Data={Data} setIsOpen={HandleSelected} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        footer={null}
        title="Thêm slide"
        open={isAddModel}
        width={1200}
        onCancel={() => setIsAddModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <SlideHandle
          setIsOpen={setIsAddModel}
          Products={ProductsData}
          Posts={PostsData}
          slideLength={
            Data === undefined
              ? 0
              : Data[0]?.stt === undefined
              ? 0
              : Data[0]?.stt + 1
          }
        />
      </Modal>

      <Modal
        title="Chỉnh sửa"
        footer={null}
        open={isUpdateModel}
        width={1000}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsUpdateModel(false)}
      >
        <SlideHandle
          setIsOpen={setIsUpdateModel}
          slideLength={FormData?.stt}
          Type="update"
          Products={ProductsData}
          Posts={PostsData}
        />
      </Modal>
    </div>
  );
};

export default Slide;
