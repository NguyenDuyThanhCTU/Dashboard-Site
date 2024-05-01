import { useStateProvider } from '@context/StateProvider';
import { Modal, Pagination, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import Heading from '@components/items/admin/UI/Heading';
import Handle from './Category/Handle';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import { ProductCategoryProps } from '@assets/TypeProps';
import ProductCategoryBox from './Category/Display';

const Category = ({ Data }: { Data: ProductCategoryProps[] }) => {
  const [isAddModel, setIsAddModel] = useState<boolean>(false);
  const [isUpdateModel, setIsUpdateModel] = useState<boolean>(false);
  const [currentPagination, setCurrentPagination] = useState<number>(1);
  const [DataShow, setDataShow] = useState<ProductCategoryProps[]>([]);
  const { setFormData, FormData } = useStateProvider();

  const HandleSelectProduct = (id: string) => {
    setIsUpdateModel(true);
    const sort = Data?.filter((item: any) => item.id === id);
    setFormData(sort[0]);
  };

  useEffect(() => {
    if (currentPagination === 1) {
      setDataShow(Data?.slice(0, 10));
    } else {
      setDataShow(
        Data?.slice((currentPagination - 1) * 10, currentPagination * 10)
      );
    }
  }, [currentPagination, Data]);

  useEffect(() => {
    setDataShow(Data?.slice(0, 10));
  }, [Data]);

  return (
    <>
      <Heading
        description="  Tại đây, bạn có thể phân mục, thêm, chỉnh sửa hoặc các đối tượng trong
        danh mục sản phẩm của mình"
        title="Danh mục sản phẩm"
      />
      <div className="flex mt-5">
        <CRUDButton
          Clicked={setIsAddModel}
          Label="Thêm"
          value="mục sản phẩm"
          Style="hover:bg-emerald-900 bg-emerald-700"
        />
      </div>
      <div className="font-LexendDeca font-light">
        <div className="mt-5 text-black">
          <ProductCategoryBox
            DataShow={DataShow}
            setIsOpen={HandleSelectProduct}
          />
          <div className="w-full justify-end flex mt-4 mr-2">
            {Data?.length > 10 && (
              <Pagination
                current={currentPagination}
                onChange={(page) => setCurrentPagination(page)}
                total={Data?.length}
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        footer={null}
        title="Thêm danh mục sản phẩm"
        open={isAddModel}
        width={1000}
        onCancel={() => setIsAddModel(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle
          setIsOpen={setIsAddModel}
          categoryLength={
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
        width={700}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsUpdateModel(false)}
      >
        <Handle
          setIsOpen={setIsUpdateModel}
          Type="update"
          categoryLength={FormData?.stt}
        />
      </Modal>
    </>
  );
};

export default Category;
