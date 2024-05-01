import { ProductProps, SaleDataProps } from '@assets/TypeProps';
import { convertDate } from '@components/items/admin/Handle/Handle';
import { useStateProvider } from '@context/StateProvider';
import { insertOne } from '@lib/api';
import { Modal, notification } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SaleListFormProps {
  Data: ProductProps[];
  SaleData: SaleDataProps[];
}

const SaleListForm = ({ Data, SaleData }: SaleListFormProps) => {
  const [discount, setDiscount] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<string>('');
  const [discountedAmount, setDiscountedAmount] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const [ProductSelected, setProductSelected] = useState<ProductProps | any>();

  const { HandleNavigate, setFormData } = useStateProvider();

  const Navigate = (url: string, type: string) => {
    if (type === 'Bài viết') {
      HandleNavigate(`/bai-viet/${url}`);
    } else if (type === 'Sản phẩm') {
      HandleNavigate(`/chi-tiet-san-pham/${url}`);
    }
  };
  const router = useRouter();

  const HandleSelected = (id: string) => {
    const sort = Data?.find((item) => item.id === id);
    if (sort) {
      setProductSelected(sort);
    }
  };

  const calculateNewPrice = () => {
    if (discount === 0) {
      setDiscount(0);
      setNewPrice('0');
    } else if (discount > 100) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Tỷ lệ giảm giá không được lớn hơn 100%',
      });
    } else if (discount < 0) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Tỷ lệ giảm giá không được nhỏ hơn 0%',
      });
    } else {
      //remove dot and remove space
      const Price = ProductSelected?.price
        .replace(/\./g, '')
        .replace(/\s/g, '');

      // const discountedAmount = (newPrice * discount) / 100
      const discountedAmount = Price * (discount / 100);
      const calculatedNewPrice = Price - discountedAmount;
      setDiscountedAmount(
        discountedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      );
      setNewPrice(
        calculatedNewPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      );
      setDiscount(discount);
      setIsShow(true);
    }
  };

  const HandleDiscard = () => {
    setIsShow(false);
    setDiscount(0);
    setNewPrice('');
    setDiscountedAmount('');
  };

  const HandleSubmit = () => {
    const sort = SaleData?.find(
      (item: any) => item.url === ProductSelected?.url
    );
    if (!discount) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Vui lòng nhập Tỷ lệ (%) giảm giá',
      });
    } else if (!newPrice) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: 'Chọn "Xem giá mới" trước khi thêm vào danh sách Sale',
      });
    } else if (sort) {
      notification.info({
        message: 'Lỗi khi thêm vào danh sách Sale',
        description: `Sản phẩm "${ProductSelected?.title}" đã có trong danh sách Sale`,
      });
    } else {
      const { id, ...rest } = ProductSelected;

      insertOne('Sale', {
        ...rest,
        newPrice: newPrice,
        discountedAmount: discountedAmount,
        discount: discount,
      }).then(() => {
        setIsOpenModel(false);
        router.refresh();
      });
    }
  };

  return (
    <div className="font-LexendDeca">
      <div className="grid grid-cols-4 border-b-2 border-black py-3">
        {['Sản phẩm', 'Giá gốc', 'Thời gian'].map((item, idx) => (
          <div
            key={idx}
            className={`${
              item === 'Sản phẩm' ? 'col-span-2 ml-2' : ' col-span-1'
            }
          flex  w-full
          `}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[500px] overflow-y-auto scrollbar-thin text-[13px]">
        {Data?.map((item, idx) => {
          return (
            <div
              className="grid grid-cols-4 border-b py-3 cursor-pointer hover:bg-slate-100 items-center "
              key={idx}
              onClick={() => {
                HandleSelected(item.id);
                setIsOpenModel(true);
              }}
            >
              <div className="text-start col-span-2  flex items-center gap-3  font-normal duration-300 ml-5 mr-2">
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
                </div>
              </div>
              <div className="flex items-center ">
                {item.price} <sup>VNĐ</sup>
              </div>
              <div className="">{item.date}</div>{' '}
            </div>
          );
        })}
      </div>

      <Modal
        title="Cập nhật giá mới"
        footer={null}
        open={isOpenModel}
        destroyOnClose={true}
        afterClose={() => {
          setFormData({});
          HandleDiscard();
        }}
        onCancel={() => setIsOpenModel(false)}
      >
        <div className="flex flex-col gap-2 font-LexendDeca font-light">
          <div>
            Giá hiện tại{' '}
            <strong className="text-red-500">
              {ProductSelected?.price} <sup>VNĐ</sup>{' '}
            </strong>
          </div>
          <div className="flex items-center gap-5">
            <label>Giảm giá (%):</label>
            <div className="py-2 px-4 border rounded-lg">
              <input
                type="number"
                onChange={(e) => {
                  const discountValue = parseInt(e.target.value);
                  setDiscount(discountValue);
                }}
                className="outline-none"
              />
            </div>
          </div>
          <div className="flex">
            {discount ? (
              <>
                {' '}
                <div
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-800 duration-300 text-white cursor-pointer"
                  onClick={() => calculateNewPrice()}
                >
                  Xem giá mới
                </div>
              </>
            ) : (
              <>
                {' '}
                <div className="px-3 py-2 bg-indigo-400   text-white cursor-not-allowed">
                  Xem giá mới
                </div>
              </>
            )}
          </div>
          {isShow && (
            <div className="border rounded-xl shadow-xl">
              <div className="p-3 flex justify-between px-5 ">
                <div>
                  <div>
                    Giá cũ:{' '}
                    <strong className="text-gray-400 line-through">
                      {ProductSelected?.price} <sup>VNĐ</sup>
                    </strong>
                  </div>

                  <div>
                    Giá mới:{' '}
                    <strong className="text-blue-500">
                      {newPrice} <sup>VNĐ</sup>
                    </strong>
                  </div>
                </div>

                <div>
                  <div className="">
                    Giảm giá:{' '}
                    <strong className="text-red-500">{discount} %</strong>
                  </div>
                  <div>
                    Đã giảm:{' '}
                    <strong className="text-red-500">
                      {discountedAmount} <sup>VNĐ</sup>
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex justify-end border-t border-gray-400 mt-2">
            <div
              className="py-2 px-3 bg-red-500 hover:bg-red-700 duration-300 cursor-pointer text-white rounded-lg mt-2"
              onClick={() => HandleSubmit()}
            >
              Thêm vào danh sách Sale
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SaleListForm;
