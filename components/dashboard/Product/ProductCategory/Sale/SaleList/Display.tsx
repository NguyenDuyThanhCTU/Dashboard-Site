import { SaleDataProps } from '@assets/TypeProps';
import { deleteOne } from '@lib/api';
import { Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface SaleListBoxProps {
  Data: SaleDataProps[];
  setIsOpen: (isOpen: boolean) => void;
}

const SaleListBox = ({ Data, setIsOpen }: SaleListBoxProps) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Sale', id).then(() => {
      router.refresh();
    });
  };
  return (
    <>
      {' '}
      <div className="mt-5 text-black d:block p:hidden">
        <div className="grid grid-cols-7 border-b-2 border-black py-3 font-semibold">
          {['Sản phẩm', 'Giá gốc', 'Giá mới', 'Đã giảm', 'Thời gian', ''].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Sản phẩm' ? 'col-span-2 ml-3' : ' col-span-1'
                } flex  w-full`}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div>
          {Data ? (
            <div>
              <div className="max-h-[415px] overflow-y-auto scrollbar-thin">
                {Data?.map((item, idx) => {
                  return (
                    <div
                      className="grid grid-cols-7   border-b py-3 cursor-pointer hover:bg-slate-200 items-center text-[14px]"
                      key={idx}
                    >
                      <div className="col-span-2  flex items-center gap-2 ml-2 mr-5">
                        <div className="border rounded-lg bg-gray-100 flex items-center w-max ">
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
                        <p className="truncate">{item.title}</p>
                      </div>

                      <p className="truncate text-gray-400 line-through">
                        {item.price} <sup>VNĐ</sup>
                      </p>

                      <p className="truncate font-normal">
                        {item.newPrice} <sup>VNĐ</sup>
                      </p>
                      <div className=" text-red-500">
                        {item.discountedAmount} <sup>giảm {item.discount}%</sup>
                      </div>
                      <div>
                        <p>{item.date}</p>
                      </div>
                      <div className="w-full flex items-center justify-end pr-5">
                        <Popconfirm
                          title="Xóa phản hồi"
                          description="Bạn có chắc chắn muốn xóa phản hồi này không?"
                          placement="topLeft"
                          onConfirm={() => HandleDelete(item.id)}
                          okType="danger"
                          okText="Yes"
                          cancelText="No"
                        >
                          <div className="text-[30px] text-red-500 hover:scale-125 duration-300">
                            <MdDeleteForever />
                          </div>
                        </Popconfirm>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer hover:underline mt-4"
                onClick={() => setIsOpen(true)}
              >
                <FaPlus />
                <p>Thêm sản phẩm vào chiến dịch </p>
              </div>
            </div>
          ) : (
            <>
              <div className=" font-LexendDeca font-extralight flex flex-col  items-center">
                <div className="   ">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/comtamkim-25c88.appspot.com/o/Product%20Not%20Found.png?alt=media&token=da544d60-6450-45a4-abd7-92e945037fdb"
                    alt="404 Not Found"
                    width={500}
                    height={500}
                    className="w-30 h-30 object-cover object-center"
                  />
                </div>
                <div>
                  <div className="text-center p:text-[14px] d:text-[16px]">
                    <p>Không có sản phẩm nào đang SALE</p>
                    <p>Hãy thêm sản phẩm để bắt đầu đợt SALE mới nhé !</p>
                  </div>
                  <div className="text-white text-center cursor-pointer  mt-5">
                    <div
                      className="py-2 px-4 rounded-full bg-green-600 duration-300 hover:bg-green-800"
                      onClick={() => setIsOpen(true)}
                    >
                      Thêm sản phẩm
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleListBox;
