'use client';
import React from 'react';

import { IconMapping } from '@assets/item';
import { SocialMediaDashboardProps, SocialMediaProps } from '@assets/TypeProps';
import SocialMediaCard from './Card';

const SocialMedia = ({ Data }: { Data: SocialMediaProps }) => {
  const SocialMediaDashboard: SocialMediaDashboardProps[] = [
    {
      title: 'Trang zalo',
      icon: 'SiZalo',
      image:
        'https://atpsoftware.vn/wp-content/uploads//2020/03/20211208103735_id_zalo-1.jpg',
      style: 'hover:text-blue-400 hover:bg-white',
      field: 'zalo',
      Data: Data?.zalo,
    },
    {
      title: 'Facebook cá nhân',
      icon: 'BsFacebook',
      image:
        'https://images.unsplash.com/photo-1633675254053-d96c7668c3b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZWJvb2slMjBsb2dvfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      style: 'hover:bg-white hover:text-blue-600',
      field: 'facebook',
      Data: Data?.facebook,
    },
    {
      title: 'Trang Fanpage',
      icon: 'HiOutlineUserGroup',
      image:
        'https://img.freepik.com/premium-photo/3d-pile-facebook-logo-background-facebook-famous-social-media-platform_73903-705.jpg?w=2000',
      style: 'hover:bg-white hover:text-black p-1',
      field: 'fanpage',
      Data: Data?.fanpage,
    },
    {
      title: 'Trang Messenger',
      icon: 'BsMessenger',
      image:
        'https://img.freepik.com/premium-photo/3d-facebook-messenger-logo-application-blue-background-social-media-communication_73903-695.jpg',
      style: 'hover:bg-white hover:text-blue-600 p-1',
      field: 'messenger',
      Data: Data?.messenger,
    },
    {
      title: 'Trang Instagram',
      icon: 'AiFillInstagram',
      image: 'https://images2.alphacoders.com/123/1230947.png',
      style: 'hover:bg-pink-500 hover:text-white',
      field: 'instagram',
      Data: Data?.instagram,
    },

    {
      title: 'Trang Tiktok',
      icon: 'FaTiktok',
      image: 'https://images.alphacoders.com/112/1123670.png',
      style: 'hover:bg-black hover:text-white p-1',
      field: 'tiktok',
      Data: Data?.tiktok,
    },

    {
      title: 'Trang Youtube',
      icon: 'FaYoutube',
      image:
        'https://w.forfun.com/fetch/b1/b1f30b4f90b01968a399a7007e25798c.jpeg',
      style: 'hover:bg-black hover:text-white p-1',
      field: 'Youtube',
      Data: Data?.youtube,
    },
  ];

  return (
    <div className="w-full ">
      <div className=" rounded-md border-gray-500 ">
        <div className="border mx-5">
          <h3 className="p-5 shadow-lg rounded-t-md text-[25px]">
            Các kênh truyền thông
          </h3>
        </div>
        <div className="p-5 grid d:grid-cols-4 gap-10 p:grid-cols-1  mt-5 ">
          {SocialMediaDashboard.map((items: SocialMediaDashboardProps, idx) => {
            let Icon = IconMapping[items.icon];
            return (
              <div key={idx}>
                <SocialMediaCard
                  value={Data}
                  Icon={Icon}
                  index={idx}
                  Data={items}
                  field={items.field}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
