'use client';
import { useStateProvider } from '@context/StateProvider';
import { Select } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import vnflag from '@assets/login/vn.png';
import usflag from '@assets/login/us.png';

const SwitchLanguage = ({ Lang }: { Lang: string }) => {
  const { HandleNavigate } = useStateProvider();
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  const LanguageItems = [
    {
      Name: 'Tiếng Việt',
      Flag: vnflag,
      Locale: 'vi',
    },
    {
      Name: 'English',
      Flag: usflag,
      Locale: 'en',
    },
    {
      Name: 'Chinese',
      Flag: 'https://firebasestorage.googleapis.com/v0/b/agiseafood-7bdaa.appspot.com/o/china-162389_640.png?alt=media&token=2ca014f5-da2e-4a66-ba95-8f799ed16b62',
      Locale: 'cn',
    },
  ];
  return (
    <Select
      className="w-full"
      value={Lang}
      onChange={(e: any) => HandleNavigate(redirectedPathName(e))}
    >
      {LanguageItems.map((item, index) => (
        <Select.Option value={item.Locale} key={index}>
          <div className="flex items-center gap-2">
            <Image width={20} height={20} src={item.Flag} alt="vietnam flag" />
            <p>{item.Name}</p>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SwitchLanguage;
