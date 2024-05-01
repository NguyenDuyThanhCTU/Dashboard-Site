import { ContactProps } from '@assets/props';
import HeaderBox from '@components/dashboard/items/UI/HeaderBox';
import { Tooltip } from 'antd';
import Image from 'next/image';
import React from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';

interface ContactBoxProps {
  setIsOpen: (isOpen: void) => void;
  Data: ContactProps;
}

type ContactItemsProps = {
  label: string;
  value: ContactProps[keyof ContactProps];
  tooltip: string;
};

const ContactBox = ({ setIsOpen, Data }: ContactBoxProps) => {
  const ContactItems: ContactItemsProps[] = [
    {
      label: 'Địa chỉ website',
      value: Data?.WebsiteAddress,
      tooltip:
        'Số điện thoại chính của website, Số điện thoại này sẽ được ưu tiên hiển thị trên website và nút gọi điện thoại',
    },
    {
      label: 'Số điện thoại',
      value: Data?.Hotline,
      tooltip: '',
    },
    {
      label: 'Số điện thoại (phụ)',
      value: Data?.PhoneNumber,
      tooltip: '',
    },
    {
      label: 'Email',
      value: Data?.Email,
      tooltip: '',
    },
    {
      label: 'Thời gian hoạt động website',
      value: Data?.WebsiteTime,
      tooltip: '',
    },
    {
      label: 'Thời gian hoạt động của công ty',
      value: Data?.CompanyTime,
      tooltip: '',
    },
    {
      label: 'Địa chỉ (chi nhánh chính)',
      value: Data?.CompanyAddress,
      tooltip: '',
    },

    {
      label: 'Logo website',
      value: Data?.LogoWebsite,
      tooltip: '',
    },
  ];
  return (
    <>
      <div className="p-4 flex flex-col gap-1">
        <HeaderBox
          Title="Thông tin website "
          ClickedProps={() => setIsOpen()}
          Description="Cập nhật thông tin website của bạn cho tương tác của khách hàng"
        />

        <div className="mt-4">
          {ContactItems.map((item, idx) => (
            <div
              key={idx}
              className={`${
                idx === ContactItems.length - 1 ? 'border-y' : 'border-t '
              } grid grid-cols-6  border-x `}
            >
              <div className="py-2 pr-3 border-r flex items-center gap-2 col-span-2 w-full justify-end">
                {' '}
                <p> {item.label}</p>{' '}
                {item.tooltip && (
                  <Tooltip title={item.tooltip}>
                    {' '}
                    <div className="">
                      <FaRegCircleQuestion />
                    </div>
                  </Tooltip>
                )}
                :{' '}
              </div>
              {item.label === 'Vị trí (Google map)' ? (
                <></>
              ) : item.label === 'Logo website' ? (
                <div className="py-2 flex items-center  ml-2">
                  <Image
                    src={
                      item.value
                        ? item.value
                        : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                    }
                    alt="logo website"
                    width={100}
                    height={100}
                  ></Image>
                </div>
              ) : (
                <div className="col-span-4 pl-2 py-2 text-gray-00">
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactBox;
