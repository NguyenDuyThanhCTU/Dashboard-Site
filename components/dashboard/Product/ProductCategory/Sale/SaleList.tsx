import React, { useState } from 'react';
import { useStateProvider } from '@context/StateProvider';
import { Modal } from 'antd';
import Handle from './SaleList/Handle';
import { ProductProps, SaleDataProps } from '@assets/TypeProps';
import SaleListBox from './SaleList/Display';

interface SaleListProps {
  Data: SaleDataProps[];
  ProductData: ProductProps[];
}

const SaleList = ({ Data, ProductData }: SaleListProps) => {
  const { setFormData } = useStateProvider();
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);

  return (
    <>
      <div className="font-LexendDeca font-light">
        <SaleListBox Data={Data} setIsOpen={setIsOpenModel} />
        <Modal
          title="Thêm"
          footer={null}
          open={isOpenModel}
          width={700}
          destroyOnClose={true}
          afterClose={() => setFormData({})}
          onCancel={() => setIsOpenModel(false)}
        >
          <Handle Data={ProductData} SaleData={Data} />
        </Modal>
      </div>
    </>
  );
};

export default SaleList;
