import { ProductCategoryProps } from '@assets/TypeProps';
import { ProductTypeItems, WebsiteUrl } from '@assets/item';
import { uploadImage } from '@components/items/admin/Handle/Handle';
import HandleKeyword from '@components/items/admin/Handle/Keyword';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { ColorPicker, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdUpload } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import slugify from 'slugify';

interface lv1CategoryProps {
  label: string;
  value: string;
}

export const StaticForm = ({
  Category,
}: {
  Category: ProductCategoryProps[];
}) => {
  const [DataFilter, setDataFilter] = useState<lv1CategoryProps[]>([]);
  const { FormData, setFormData } = useStateProvider();

  useEffect(() => {
    let sortedData = Category?.filter(
      (item: any) => item.level0 === FormData?.level0
    );

    let formattedArray = sortedData?.map((item: any) => ({
      label: item.level1,

      value: slugify(item?.level1 ? item?.level1 : '', {
        lower: true,
        locale: 'vi',
      }),
    }));
    setDataFilter(formattedArray);
  }, [FormData.level0]);

  const customRequest = async (options: any) => {
    options.onSuccess({});

    try {
      const url = await uploadImage(options.file, 'avatar');
      const newUrl = {
        uid: options.file.uid,
        url: url,
      };
      if (FormData?.subimage === undefined) {
        setFormData({ ...FormData, subimage: [newUrl] });
      } else {
        setFormData({ ...FormData, subimage: [...FormData?.subimage, newUrl] });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleRemove = (file: any) => {
    const newImageUrl = FormData?.subimage.filter(
      (item: any) => item.uid !== file.uid
    );
    setFormData({ ...FormData, subimage: newImageUrl });
  };

  return (
    <form className="flex flex-col gap-2">
      <InputForm
        Label="Tên sản phẩm"
        Type="Input"
        field="title"
        Tips="Nhập tên sản phẩm, tối đa 100 ký tự"
      />
      <InputForm
        Label="Giá sản phẩm"
        Type="Input"
        field="price"
        Tips="Nhập giá sản phẩm (VD: 1.000.000, 10.000.000, ...) .Tối đa 100 ký tự"
      />
      <InputForm Label="Thẻ Mô tả" Type="TextArea" field="description" />

      <div className="border border-gray-600">
        <div className="p-3 flex flex-col gap-2">
          <InputForm
            Label="Loại sản phẩm"
            Type="Select"
            field="level0"
            Option={ProductTypeItems}
          />
          <>
            {' '}
            <InputForm
              Label="Mục sản phẩm"
              Type="Select"
              field="level1"
              Option={DataFilter}
            />
          </>
        </div>
      </div>
      <div className="flex gap-5 flex-col mt-5">
        <InputForm Label="Mô tả sản phẩm" Type="Editor" field="describe" />
        <InputForm Label="Thông số sản phẩm" Type="Editor" field="detail" />
      </div>
      <div className="flex flex-col gap-2">
        <label>Ảnh phụ</label>
        <Upload
          customRequest={customRequest}
          listType="picture-card"
          onRemove={handleRemove}
        >
          <div className="flex flex-col items-center">
            <AiOutlinePlus className="text-[24px]" />
            <div className="mt-2">Upload</div>
          </div>
        </Upload>
      </div>
      <InputForm Label="Ảnh đại diện" Type="Upload" field="image" />
    </form>
  );
};

export const DynamicForm = () => {
  const [Color, setColor] = useState('');
  const { FormData, setFormData } = useStateProvider();
  return (
    <div className="">
      <div className="border rounded-lg bg-slate-100 ">
        <div className="p-3 grid grid-cols-2 gap-5 items-center">
          <div className="border rounded-lg  h-20 border-black overflow-y-auto scrollbar-thin">
            <div className="p-2 flex flex-wrap gap-5">
              {FormData?.color?.length > 0 && (
                <>
                  {FormData?.color?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className={` bg-[#${item}] border rounded-full relative`}
                    >
                      <ColorPicker value={`#${item}`} />
                      <div
                        className="bg-white p-1 absolute rounded-full w-max -top-2 -right-2 cursor-pointer"
                        onClick={() => {
                          const newColor = FormData?.color.filter(
                            (itemColor: any) => itemColor !== item
                          );
                          setFormData({
                            ...FormData,
                            color: newColor,
                          });
                        }}
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className=" ">
            <div className="px-4 py-1 border border-black border-dashed flex  items-center justify-between   bg-white rounded-lg w-full col-span-6">
              <div>
                <p>Chọn Màu: </p>
                <ColorPicker
                  defaultValue="#1677ff"
                  onChangeComplete={(e) => setColor(e.toHex())}
                  showText
                  className="mt-3"
                />
              </div>
              <div
                className="text-[20px]  cursor-pointer duration-300 hover:text-blue-500"
                onClick={() => {
                  if (FormData?.color === undefined) {
                    setFormData({
                      ...FormData,
                      color: [Color],
                    });
                    setColor('');
                  } else {
                    setFormData({
                      ...FormData,
                      color: [...FormData?.color, Color],
                    });
                  }

                  setColor('');
                }}
              >
                <MdUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export const SEOForm = () => {
  const { FormData } = useStateProvider();
  return (
    <form className="font-LexendDeca">
      <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
        <div className=" flex flex-col px-5 py-3 text-[18px] font-normal">
          <h2 className="text-[#1a0dab]  text-[30px] font-semibold">
            {FormData?.title === undefined ? <>N/A</> : FormData?.title}
          </h2>
          <p className="text-[#006621]">
            {WebsiteUrl}/{FormData?.url}
          </p>
          <p className="">
            {FormData?.description === undefined
              ? 'N/A'
              : FormData?.description}
          </p>
        </div>
      </div>

      <div className="flex  flex-col gap-2 mt-5">
        <InputForm
          PlaceHolder={FormData?.title}
          Label="Thẻ tiêu đề trang"
          Type="Input"
          field="title"
        />
        <InputForm Label="Đường dẫn" Type="Input" field="url" />

        <InputForm Label="Thẻ mô tả" Type="Input" field="description" />

        <HandleKeyword />
      </div>
    </form>
  );
};
