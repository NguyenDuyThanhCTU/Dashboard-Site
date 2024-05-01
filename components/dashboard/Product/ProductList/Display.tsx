'use client';
import { ProductProps } from '@assets/TypeProps';
import { ProductTypeItems } from '@assets/item';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { deleteOne, updateOne } from '@lib/api';
import { Modal, Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { TbArrowsMoveVertical } from 'react-icons/tb';

interface ListProductProps {
  DataShow: ProductProps[];
  setIsOpen: (isOpen: string) => void;
}

const ListProductBox = ({ DataShow, setIsOpen }: ListProductProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isSelected, setSelected] = useState<ProductProps>();
  const [isNewPosition, setNewPosition] = useState<number>();
  const router = useRouter();
  const HandleDelete = async (id: string) => {
    deleteOne('Products', id).then(() => {
      router.refresh();
    });
  };

  const HandleChangePosition = () => {
    const sort = DataShow?.find((item) => item.stt === isNewPosition);
    if (sort) {
      updateOne('Products', isSelected ? isSelected.id : '100', {
        stt: isNewPosition,
      });
      updateOne('Products', sort.id, {
        stt: isSelected?.stt,
      });
      router.refresh();
      setOpenModal(false);
    } else {
    }
  };

  return (
    <>
      <div className="mt-5 text-black ">
        <div className="p:hidden d:grid grid-cols-8 border-b-2 border-black py-3 font-semibold">
          {['Sản phẩm', 'Đơn giá', 'Danh mục', 'Tags', 'Thời gian', ''].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Sản phẩm' || item === 'Tags'
                    ? 'col-span-2 ml-5 '
                    : 'col-span-1'
                }
                flex  w-full
                `}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div className="p:hidden d:block h-[605px] overflow-y-auto scrollbar-thin">
          {DataShow?.map((item, idx) => {
            return (
              <div
                className="grid grid-cols-8 border-b py-3 cursor-pointer hover:bg-slate-100 items-center text-[14px]"
                key={idx}
              >
                <div className="text-start col-span-2  flex items-center gap-3  font-normal duration-300 ml-5 mr-2">
                  <div>{item.stt}</div>
                  <div className="border rounded-lg bg-gray-100 flex w-max">
                    <div className="p-2 w-14 h-14">
                      <Image
                        src={
                          item.image
                            ? item.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt="product"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-blue-700 font-semibold hover:underline hover:text-blue-800 duration-300">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[14px]">
                      <span>Mã SP:</span>
                      <div className="rounded-md px-3 py-1 bg-gray-200">
                        #{item.id}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-red-500">
                  {item.price ? (
                    <p>
                      {item.price} <sup>VNĐ</sup>
                    </p>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>
                <div className="flex flex-col items-start text-[14px] ">
                  <p className="px-3 py-2 bg-main rounded-full text-white">
                    {
                      ProductTypeItems.find(
                        (items: any) => items.value === item.level0
                      )?.label
                    }
                  </p>
                  {item.level1 && (
                    <p className="ml-3 mt-1 w-max py-1 px-3 rounded-xl bg-adminOrange">
                      {item.level1}
                    </p>
                  )}
                </div>
                <div className="  col-span-2">
                  {item?.Keyword?.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {item?.Keyword.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="border bg-slate-200 rounded-full relative"
                        >
                          <div className="w-max py-1 px-3">{item}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="">{item.date}</div>{' '}
                <div className="flex items-center  justify-center gap-3 text-[22px] mr-3 cursor-pointer">
                  <div
                    className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                    onClick={() => {
                      setIsOpen(item.id);
                    }}
                  >
                    <FaEdit />
                  </div>
                  <Popconfirm
                    title="Xóa phản hồi"
                    description="Bạn có chắc chắn muốn xóa phản hồi này không?"
                    placement="topLeft"
                    onConfirm={() => HandleDelete(item.id)}
                    okType="danger"
                    okText="Yes"
                    cancelText="No"
                  >
                    <div className="text-red-500 hover:text-red-700 duration-300 hover:scale-125">
                      <MdDeleteForever />
                    </div>
                  </Popconfirm>
                  <div
                    onClick={() => {
                      setOpenModal(true);
                      setSelected(item);
                    }}
                  >
                    <TbArrowsMoveVertical />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <>
        <Modal
          open={isOpenModal}
          closeIcon={null}
          footer={null}
          width={500}
          centered
          onCancel={() => setOpenModal(false)}
        >
          <div>
            <h2>Stt hiện tại: {isSelected?.stt}</h2>
            <div>
              <div className="px-4 py-1 border  bg-white rounded-lg w-full mt-1 shadow-sm hover:shadow-lg duration-200">
                <input
                  type="number"
                  placeholder="Nhập vị trí mới"
                  className=" outline-none w-full"
                  value={isNewPosition}
                  onChange={(e) => setNewPosition(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div
              className="py-2 text-white  w-full bg-blue-500  hover:bg-blue-700 duration-300 text-center cursor-pointer mt-5"
              onClick={() => HandleChangePosition()}
            >
              Cập nhật
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ListProductBox;
