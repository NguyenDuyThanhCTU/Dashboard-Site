'use client';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import SortTable from '@components/items/admin/UI/SortTable';
import { useStateProvider } from '@context/StateProvider';
import { Modal } from 'antd';
import React, { useState } from 'react';
import AccountHandle from './General/AccountHandle';
import Search from '@components/items/admin/UI/Search';
import FileSaver from '@components/items/admin/Handle/FileSaver';
import ListAccountBox from './General/Display';
import ManagerBox from './General/Manager';

const General = ({ Data }: any) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModel] = useState(false);
  const [DataFilter, setDataFilter] = useState<any>([]);
  const { setFormData, FormData } = useStateProvider();

  const HandleSelected = (id: string) => {
    setIsOpenUpdateModel(true);
    const sort = Data?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
  };

  return (
    <div className="border rounded-lg bg-white col-span-2">
      <div className="p-4 font-normal text-gray-700">
        <div className="flex justify-between d:flex-row p:flex-col gap-5 px-5">
          <div className="flex items-center gap-5 d:flex-row p:flex-col">
            <div>
              <h3 className="text-[30px] font-bold">Danh sách tài khoản</h3>
            </div>
            <div>
              <CRUDButton
                Clicked={setIsOpenAddModal}
                Label="Thêm"
                value="Tài khoản"
                Style="hover:bg-red-900 bg-red-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-[14px] d:flex-row p:flex-col">
            <FileSaver Data={Data} />
            <Search Data={Data} Select={HandleSelected} Field="name" />

            <SortTable Data={Data} setData={setDataFilter} Field="name" />
          </div>
        </div>
        <ListAccountBox
          Data={Data}
          DataFilter={DataFilter}
          setIsOpen={HandleSelected}
        />
        <div>
          <ManagerBox Data={Data} />
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm tài khoản"
        open={isOpenAddModal}
        width={1000}
        onCancel={() => setIsOpenAddModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <AccountHandle
          accountLength={
            Data?.length === 0 || Data === undefined ? 0 : Data[0]?.stt + 1
          }
          Data={Data}
          setIsOpen={setIsOpenAddModal}
        />
      </Modal>

      <Modal
        footer={null}
        title="Chỉnh sửa tài khoản"
        open={isOpenUpdateModal}
        width={1000}
        onCancel={() => setIsOpenUpdateModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <AccountHandle
          accountLength={FormData?.stt}
          Data={Data}
          setIsOpen={setIsOpenUpdateModel}
          Type="update"
        />
      </Modal>
    </div>
  );
};

export default General;
