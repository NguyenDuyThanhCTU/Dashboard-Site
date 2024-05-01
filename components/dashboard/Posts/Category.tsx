'use client';

import { Modal } from 'antd';
import React, { useState } from 'react';

import { useStateProvider } from '@context/StateProvider';
import { PiCardsLight } from 'react-icons/pi';

import CRUDButton from '@components/items/admin/UI/CRUDButton';
import SortTable from '@components/items/admin/UI/SortTable';
import Search from '@components/items/admin/UI/Search';
import { PostsTypeItems } from '@assets/item';
import { PostCategory } from '@assets/TypeProps';
import PostsCategoryBox from './Category/Display';
import { MdTopic } from 'react-icons/md';
import PostsCategoryForm from './Category/Create';

const PostsCategory = ({ Data }: { Data: PostCategory[] }) => {
  const [isAddModel, setIsAddModel] = useState<boolean>(false);
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [DataFilter, setDataFilter] = useState<PostCategory[]>([]);
  const { setFormData, FormData } = useStateProvider();

  const HandleOpenForm = (id: string) => {
    setIsUpdateModel(true);
    const sort = Data?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
  };

  return (
    <div className="w-full  p:px-0 d:px-10 font-light h-[90vh]  bg-white py-10">
      <div className="">
        <div className="w-full flex justify-between pr-5">
          <div className="flex items-center gap-5 d:flex-row p:flex-col">
            <div>
              <h3 className="text-[30px] font-bold">Danh sách loại bài viết</h3>
            </div>
            <div>
              <CRUDButton
                Clicked={setIsAddModel}
                Label="Thêm"
                value="loại bài viết"
                Style="hover:bg-orange-900 bg-orange-700"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-1">
              <MdTopic />
              <p>
                <strong>{PostsTypeItems.length} </strong>Mục bài viết
              </p>
            </div>
            <div className="flex items-center gap-1">
              <PiCardsLight />
              <p>
                <strong>{Data.length}</strong> Loại bài viết
              </p>
            </div>
          </div>
        </div>

        <div className="border bg-gray-100 mt-5 p:h-auto d:h-[700px] rounded-xl">
          <div className="m-4 bg-gray-100 ">
            <div className="flex items-center gap-4">
              <Search Data={Data} Select={HandleOpenForm} Field="level1" />
              <SortTable Data={Data} setData={setDataFilter} Field="level1" />
            </div>
            <div className="font-LexendDeca font-light  overflow-y-auto ">
              {' '}
              <PostsCategoryBox
                Data={Data}
                DataFilter={DataFilter}
                setIsOpen={HandleOpenForm}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm mục bài viết"
        open={isAddModel}
        width={1000}
        onCancel={() => setIsAddModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <PostsCategoryForm
          CategoryLength={
            Data === undefined
              ? 0
              : Data[0]?.stt === undefined
              ? 0
              : Data[0]?.stt + 1
          }
          setIsOpen={setIsAddModel}
        />
      </Modal>

      <Modal
        footer={null}
        title={`Cập nhật`}
        open={isUpdateModel}
        width={1000}
        onCancel={() => setIsUpdateModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <PostsCategoryForm
          setIsOpen={setIsUpdateModel}
          Type="update"
          CategoryLength={FormData?.stt}
        />
      </Modal>
    </div>
  );
};

export default PostsCategory;
