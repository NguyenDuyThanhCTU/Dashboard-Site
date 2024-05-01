'use client';
import { Modal, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStateProvider } from '@context/StateProvider';
import ProductHandle from './ProductList/ProductHandle.tsx';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import FileSaver from '@components/items/admin/Handle/FileSaver';
import Search from '@components/items/admin/UI/Search';
import SortTable from '@components/items/admin/UI/SortTable';
import { ProductCategoryProps, ProductProps } from '@assets/TypeProps.js';
import ListProductBox from './ProductList/Display';

interface ListProductProps {
  Category: ProductCategoryProps[];
  Data: ProductProps[];
}

const ListProduct = ({ Category, Data }: ListProductProps) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false);
  const [DataFilter, setDataFilter] = useState<ProductProps[]>([]);
  const [currentPagination, setCurrentPagination] = useState<number>(1);
  const [DataShow, setDataShow] = useState<ProductProps[]>([]);

  const { FormData, setFormData } = useStateProvider();

  const HandleSelectProduct = (id: string) => {
    const sort = Data?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
    setIsOpenUpdateModel(true);
  };

  useEffect(() => {
    if (currentPagination === 1) {
      setDataShow(Data?.slice(0, 10));
    } else {
      setDataShow(
        Data?.slice((currentPagination - 1) * 10, currentPagination * 10)
      );
    }
  }, [currentPagination, DataFilter, Data]);

  useEffect(() => {
    if (DataShow.length === 0) {
      setDataShow(Data?.slice(0, 10));
    } else {
      setDataShow(DataFilter);
    }
  }, [DataFilter]);
  return (
    <div className="border rounded-lg bg-white d:h-[90vh] p:h-auto">
      <div className="p-4 font-normal text-gray-700">
        <div className="flex justify-between d:flex-row p:flex-col gap-5">
          <div className="flex items-center gap-5 d:flex-row p:flex-col">
            <div>
              <h3 className="text-[30px] font-bold">Danh sách sản phẩm</h3>
            </div>
            <div>
              <CRUDButton
                Clicked={setIsOpenAddModal}
                Label="Thêm"
                value="sản phẩm"
                Style="hover:bg-emerald-900 bg-emerald-700"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-[14px] d:flex-row p:flex-col">
            <FileSaver Data={Data} />
            <Search Data={Data} Select={HandleSelectProduct} Field="title" />
            <SortTable Data={DataShow} setData={setDataFilter} Field="title" />
          </div>
        </div>
        <ListProductBox DataShow={DataShow} setIsOpen={HandleSelectProduct} />
        {Data?.length > 10 && (
          <div className="w-full justify-end flex mt-6 mr-2">
            <Pagination
              defaultCurrent={currentPagination}
              total={Data?.length}
              onChange={(e) => setCurrentPagination(e)}
            />
          </div>
        )}
      </div>

      <Modal
        footer={null}
        title="Thêm sản phẩm"
        open={isOpenAddModal}
        width={1000}
        onCancel={() => setIsOpenAddModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <ProductHandle
          setIsOpen={setIsOpenAddModal}
          Category={Category}
          productLength={
            Data === undefined ? 0 : Data?.[Data.length - 1].stt + 1
          }
          Type="add"
        />
      </Modal>

      <Modal
        title="Chỉnh sửa"
        footer={null}
        open={isOpenUpdateModel}
        width={1000}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsOpenUpdateModel(false)}
      >
        <ProductHandle
          setIsOpen={setIsOpenUpdateModel}
          Category={Category}
          Type="update"
          productLength={FormData?.stt}
        />
      </Modal>
    </div>
  );
};

export default ListProduct;
