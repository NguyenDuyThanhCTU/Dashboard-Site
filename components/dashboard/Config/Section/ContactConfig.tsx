'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal } from 'antd';
import React from 'react';
import Handle from './ContactConfig/Handle';
import ContactBox from './ContactConfig/Display';
import { ContactProps } from '@assets/props';

const ContactConfig = ({ Data }: { Data: ContactProps }) => {
  const [isOpenContactModal, setIsOpenContactModal] = React.useState(false);
  const { setFormData } = useStateProvider();

  const HandleOpen = () => {
    setIsOpenContactModal(true);
    setFormData(Data);
  };

  return (
    <div className="py-5 border-t  bg-white">
      <div className="w-full grid p:grid-cols-1 d:grid-cols-2 p:px-0 d:px-10 font-light gap-5">
        <div className="">
          <h1 className="text-[30px] font-semibold">
            Các Thông Tin Liên Hệ Website{' '}
          </h1>
          <p className=" text-gray-500">
            Đây là những gì khách hàng đang nhìn thấy từ website của bạn
          </p>
          <div className=" mt-3 border border-black shadow-sm bg-white rounded-md  ">
            <ContactBox setIsOpen={HandleOpen} Data={Data} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 ">
          <iframe
            src={Data?.GoogleMap}
            loading="lazy"
            className="w-full h-full outline-none"
          ></iframe>
        </div>
      </div>

      <Modal
        title="Cập nhật thông tin website"
        footer={null}
        open={isOpenContactModal}
        width={1000}
        onCancel={() => setIsOpenContactModal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle setIsOpen={setIsOpenContactModal} />
      </Modal>
    </div>
  );
};

export default ContactConfig;
