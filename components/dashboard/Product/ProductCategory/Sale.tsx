'use client';
import Heading from '@components/items/admin/UI/Heading';
import { useStateProvider } from '@context/StateProvider';
import { Modal, Steps } from 'antd';
import React, { useState } from 'react';
import { TbTargetArrow } from 'react-icons/tb';
import { GiClockwork } from 'react-icons/gi';
import { FaRegCircleCheck } from 'react-icons/fa6';
import SaleList from './Sale/SaleList';
import CRUDButton from '@components/items/admin/UI/CRUDButton';
import { SaleInfoProps, ProductProps, SaleDataProps } from '@assets/TypeProps';
import Handle, { TimeSale } from './Sale/SaleList/HandleTimeSale';

interface SaleProps {
  SaleInfo: SaleInfoProps;
  Data: SaleDataProps[];
  ProductData: ProductProps[];
}

const Sale = ({ SaleInfo, Data, ProductData }: SaleProps) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const { setFormData } = useStateProvider();
  const currentTime = new Date().toISOString().split('T')[0];

  return (
    <>
      <Heading
        description="Xây dựng chiến dịch giảm giá, khuyến mãi cho sản phẩm của bạn"
        title="Sales"
      />
      <div className="mt-5 flex gap-5">
        <CRUDButton
          Clicked={setIsOpenAddModal}
          Label="Cập Nhật"
          value="chiến dịch"
          Style="hover:bg-red-900 bg-red-700"
        />
      </div>
      <div className="mt-5  border shadow-lg">
        <div className=" p-4">
          <Steps
            items={[
              {
                title: 'Tạo chiến dịch',
                status: `${SaleInfo === undefined ? 'wait' : 'finish'}`,
                description: `Ngày bắt đầu: ${SaleInfo?.start}`,
                icon: <FaRegCircleCheck />,
              },
              {
                title: 'Sales',
                status: `${
                  SaleInfo === undefined
                    ? 'wait'
                    : currentTime <= SaleInfo?.end
                    ? 'process'
                    : 'finish'
                }`,
                icon: <GiClockwork />,
                description: <TimeSale end={SaleInfo?.end} />,
              },
              {
                title: 'Kết thúc',
                status: `${currentTime >= SaleInfo?.end ? 'finish' : 'wait'}`,
                icon: <TbTargetArrow />,
                description: `Ngày kết
                thúc: ${SaleInfo?.end}`,
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-5">
        <SaleList Data={Data} ProductData={ProductData} />
      </div>
      <>
        <Modal
          footer={null}
          title="Chỉnh sửa chiến dịch giảm giá"
          open={isOpenAddModal}
          width={1000}
          onCancel={() => setIsOpenAddModal(false)}
          destroyOnClose={true}
          afterClose={() => setFormData({})}
        >
          <Handle setIsOpen={setIsOpenAddModal} />
        </Modal>
      </>
    </>
  );
};

export default Sale;
