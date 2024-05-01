'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal, Tooltip } from 'antd';
import React, { useState } from 'react';
import {
  Handle404Form,
  HandleFacebookForm,
  HandleGoogleForm,
  HandleLogoForm,
  HandleTwitterForm,
} from './InformationConfig/Handle';
import {
  EmbedBox,
  ErrorBox,
  FacebookBox,
  LogoBox,
  TwitterBox,
} from './InformationConfig/Display';
import { InformationProps } from '@assets/props';

const InformationConfig = ({ Data }: { Data: Array<any> }) => {
  const [isOpen404Modal, setIsOpen404Modal] = useState(false);
  const [isHandleLogo, setIsHandleLogo] = useState(false);
  const [isHandleFacebook, setIsHandleFacebook] = useState(false);
  const [isHandleTwitter, setIsHandleTwitter] = useState(false);
  const [isHandleGoogle, setIsHandleGoogle] = useState(false);
  const { setFormData } = useStateProvider();

  const Handle = (Type: any) => {
    setFormData(Data);

    switch (Type) {
      case '404':
        setIsOpen404Modal(true);
        break;
      case 'Logo':
        setIsHandleLogo(true);
        break;
      case 'Facebook':
        setIsHandleFacebook(true);
        break;
      case 'Twitter':
        setIsHandleTwitter(true);
        break;
      case 'Google':
        setIsHandleGoogle(true);
        break;
    }
  };
  const LogoPosition = [
    {
      label: 'Góc trên bên trái',
      value: 'absolute top-0 left-0 mt-5 ml-5',
    },
    {
      label: 'Góc trên bên phải',
      value: 'absolute top-0 right-0 mt-5 mr-5',
    },
    {
      label: 'Góc dưới bên trái',
      value: 'absolute bottom-0 left-0 mb-5 ml-5',
    },
    {
      label: 'Góc dưới bên phải',
      value: 'absolute bottom-0 right-0 mb-5 mr-5',
    },

    {
      label: 'Giữa',
      value:
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    },
  ];
  return (
    <div className="pb-5 ">
      <div className="w-full grid p:grid-cols-1 d:grid-cols-2 p:px-0 d:px-10 font-light gap-5">
        <div>
          <div className="">
            <h1 className="text-[30px] font-semibold"> Cấu Hình Website </h1>
            <p className=" text-gray-500">
              Đây là những gì khách hàng đang nhìn thấy từ website của bạn
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <div className="grid p:grid-cols-1 d:grid-cols-2 gap-3">
              <ErrorBox setIsOpen={Handle} Data={Data} />
              <LogoBox setIsOpen={Handle} Data={Data} Logo={LogoPosition} />
            </div>
            <EmbedBox setIsOpen={Handle} Data={Data} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <div className="grid p:grid-cols-1 d:grid-cols-2 gap-3">
            <FacebookBox setIsOpen={Handle} Data={Data} />
            <TwitterBox setIsOpen={Handle} Data={Data} />
          </div>
        </div>
      </div>

      <Modal
        title="404 Not Found Editing"
        footer={null}
        open={isOpen404Modal}
        onCancel={() => setIsOpen404Modal(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle404Form setIsOpen={setIsOpen404Modal} />
      </Modal>

      <Modal
        title="Đóng logo vào ảnh"
        footer={null}
        open={isHandleLogo}
        onCancel={() => setIsHandleLogo(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <HandleLogoForm setIsOpen={setIsHandleLogo} Logo={LogoPosition} />
      </Modal>
      <Modal
        title="Giao diện Facebook"
        footer={null}
        open={isHandleFacebook}
        onCancel={() => setIsHandleFacebook(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <HandleFacebookForm setIsOpen={setIsHandleFacebook} />
      </Modal>
      <Modal
        title="Giao diện Twitter"
        footer={null}
        open={isHandleTwitter}
        onCancel={() => setIsHandleTwitter(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <HandleTwitterForm setIsOpen={setIsHandleTwitter} />
      </Modal>
      <Modal
        title="Cấu Hình Google Analytics"
        footer={null}
        open={isHandleGoogle}
        onCancel={() => setIsHandleGoogle(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <HandleGoogleForm setIsOpen={setIsHandleGoogle} />
      </Modal>
    </div>
  );
};

export default InformationConfig;
