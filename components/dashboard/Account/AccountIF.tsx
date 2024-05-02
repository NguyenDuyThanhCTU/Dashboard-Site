'use client';
import { useStateProvider } from '@context/StateProvider';
import { Image, Modal, Timeline } from 'antd';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsCake2 } from 'react-icons/bs';
import { FaSearchLocation, FaTransgender } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { MdPhoneInTalk } from 'react-icons/md';
import ChangePass from './AccountIF/ChangePass';
import AccountForm from './AccountIF/AccountForm';
import { useAuth } from '@context/AuthProviders';

const AccountIF = () => {
  const [isOpenForm, setIsOpenForm] = React.useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
  const { setFormData } = useStateProvider();
  const { currentUser } = useAuth();

  return (
    <div className="px-10 bg-white rounded-md">
      <div className="p-4">
        <div className="   mb-3 text-[17px] cursor-pointer  w-full flex justify-between"></div>
        <div className="border border-gray-300 ">
          <div className="p-4 grid grid-cols-2 gap-5">
            <div className="m-5">
              <Timeline
                style={{ width: '50%' }}
                className="font-normal"
                items={[
                  {
                    children: `Tài khoản: ${currentUser.username}`,
                  },
                  {
                    children: `Họ Tên: ${currentUser.name}`,
                  },
                  {
                    children: `Email: ${
                      currentUser?.email ? currentUser?.email : 'Đang cập nhật'
                    }`,
                    dot: <IoIosMail />,
                  },
                  {
                    children: `Số điện thoại: ${
                      currentUser?.phone ? currentUser?.phone : 'Đang cập nhật'
                    } `,
                    dot: <MdPhoneInTalk />,
                  },
                  {
                    children: `Địa chỉ: ${
                      currentUser?.address
                        ? currentUser?.address
                        : 'Đang cập nhật'
                    }`,
                    dot: <FaSearchLocation />,
                  },
                  {
                    children: `Ngày sinh: ${
                      currentUser?.dateofbirth
                        ? currentUser?.dateofbirth
                        : 'Đang cập nhật'
                    }`,
                    dot: <BsCake2 />,
                  },
                  {
                    children: `Giới tính : ${
                      currentUser?.gender
                        ? currentUser?.gender
                        : 'Đang cập nhật'
                    } `,
                    dot: <FaTransgender />,
                  },
                  {
                    children: `Quyền hạn: ${currentUser.role}`,
                    color: 'red',
                  },
                ]}
              />
            </div>
            <div>
              <div>
                <label>Ảnh đại diện:</label>
                <div className="mt-2">
                  <Image.PreviewGroup>
                    <Image
                      src={currentUser?.image}
                      style={{ height: 150, width: 150 }}
                      className="w-full h-full  object-center object-cover border border-gray-300 rounded-md"
                    />
                  </Image.PreviewGroup>
                </div>
              </div>
              <div>
                <label>Giới thiệu:</label>
                <div className="mt-2">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={
                      currentUser?.introduce
                        ? currentUser.introduce
                        : 'Đang cập nhật'
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5  cursor-pointer pb-4">
            <div
              className="py-2 px-6 border rounded-md hover:bg-gray-200 hover:border-gray-500"
              onClick={() => setIsOpenUpdate(true)}
            >
              Thay đổi mật khẩu
            </div>
            <div
              className="py-2 px-6 bg-red-500 rounded-md text-white hover:bg-red-700"
              onClick={() => setIsOpenForm(true)}
            >
              Cập nhật thông tin
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Thay đổi mật khẩu"
        footer={null}
        open={isOpenUpdate}
        width={700}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsOpenUpdate(false)}
      >
        <ChangePass setIsOpen={setIsOpenUpdate} />
      </Modal>
      <Modal
        title="Cập nhật thông tin"
        footer={null}
        open={isOpenForm}
        width={700}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
        onCancel={() => setIsOpenForm(false)}
      >
        <AccountForm setIsOpen={setIsOpenForm} />
      </Modal>
    </div>
  );
};

export default AccountIF;
