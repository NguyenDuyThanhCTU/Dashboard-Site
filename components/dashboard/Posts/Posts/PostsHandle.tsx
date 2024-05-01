'use client';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { Tabs, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import slugify from 'slugify';
import Display from './Tab/Display';
import { SEOForm, StaticForm } from './Tab/Form';
import { PostCategory } from '@assets/TypeProps';

interface PostsHandleProps {
  setIsOpen: (isOpen: boolean) => void;
  Category: PostCategory[];
  Type?: string;
  postsLength: number;
}

interface lv1CategoryProps {
  label: string;
  value: string;
}
const PostsHandle = ({
  setIsOpen,
  Category,
  Type,
  postsLength,
}: PostsHandleProps) => {
  const [DataFilter, setDataFilter] = useState<lv1CategoryProps[]>([]);
  const { FormData, setFormData } = useStateProvider();

  useEffect(() => {
    let sortedData = Category.filter(
      (item) => item.level0 === FormData?.level0
    );

    let formattedArray = sortedData?.map((item) => ({
      label: item.level1,
      value: slugify(item?.level1 ? item?.level1 : '', {
        lower: true,
        locale: 'vi',
      }),
    }));

    setDataFilter(formattedArray);
  }, [FormData?.level0]);

  useEffect(() => {
    const randomText = Math.floor(Math.random() * 100000000000);
    const headUrl = slugify(`${FormData?.title}-p${randomText}.html`, {
      lower: true,
      locale: 'vi',
    });
    setFormData({
      ...FormData,
      stt: postsLength,
      url: `${headUrl}?poid=${
        postsLength ? 100000000000 + postsLength : 100000000000
      }`,
    });
  }, [FormData?.title]);

  const router = useRouter();
  const HandleSubmit = async () => {
    if (!FormData?.title) {
      notification.error({
        message: 'Vui lòng nhập tiêu đề!',
        description: 'Tiêu đề không được để trống!!!',
      });
    } else if (!FormData?.level0) {
      notification.error({
        message: 'Vui lòng chọn danh mục!',
      });
    } else {
      const level0 = slugify(`${FormData?.level0}`, {
        lower: true,
        locale: 'vi',
      });
      let Data = { ...FormData, level0: level0 };

      await insertAndCustomizeId(
        'Posts',
        Data,
        `${postsLength ? 100000000000 + postsLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });

      router.refresh();
    }
  };
  return (
    <div className="relative h-[60vh] overflow-y-auto scrollbar-thin px-3">
      <Tabs
        tabPosition="top"
        items={[
          {
            key: '1',
            label: `${
              Type === 'update' ? 'Thông tin bài viết' : 'Chi tiết bài viết'
            }`,
            children: (
              <>
                {Type === 'update' ? (
                  <Display />
                ) : (
                  <StaticForm DataFilter={DataFilter} />
                )}
              </>
            ),
          },
          {
            key: '2',
            label: `${
              Type === 'update' ? 'Chỉnh sửa bài viết' : 'Cấu hình SEO'
            }`,
            children: (
              <>
                {Type === 'update' ? (
                  <StaticForm DataFilter={DataFilter} />
                ) : (
                  <SEOForm />
                )}
              </>
            ),
          },
          {
            key: '3',
            label: `${Type === 'update' ? 'Cấu hình SEO' : ''}`,
            children: <>{Type === 'update' ? <SEOForm /> : <></>}</>,
          },
        ]}
      />

      <>
        <div className="flex w-full justify-end mt-5 pt-3 border-t border-black">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white p-2 rounded-md"
            onClick={() => HandleSubmit()}
          >
            Cập nhật
          </div>
        </div>
      </>
    </div>
  );
};

export default PostsHandle;
