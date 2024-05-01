import { HeaderItems, WebsiteUrl } from '@assets/items';
import { ContactProps, InformationProps } from '@assets/props';
import HeaderBox from '@components/dashboard/items/UI/HeaderBox';
import Image from 'next/image';
import { FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ImFacebook } from 'react-icons/im';

type Logo = {
  label: string;
  value: string;
};

interface BoxProps {
  setIsOpen: (isOpen: string) => void;
  Data: Array<any>;
  Logo?: Array<Logo>;
}

export const ErrorBox = ({ setIsOpen, Data }: BoxProps) => {
  const informationData: InformationProps = Data?.find(
    (item: any) => item.id === 'information'
  );

  return (
    <>
      <div className="border shadow-sm bg-white rounded-md border-gray-200 ">
        <div className="p-4 flex flex-col gap-1">
          <HeaderBox
            Title="Trang Lỗi 404"
            ClickedProps={() => setIsOpen('404')}
            Description="Trang '404 Not Found' xuất hiện khi URL không chính xác, trang web đã bị xóa hoặc máy chủ không thể tìm thấy URL mà bạn đang cố truy cập"
          />
          <div>
            <h3>Ảnh hiển thị:</h3>

            <div className="relative mt-2  h-[150px] w-[150px]">
              <Image
                src={
                  informationData?.ImageNotFound
                    ? informationData?.ImageNotFound
                    : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                }
                alt="404 Not Found"
                fill
                className="object-contain "
              />
            </div>
          </div>
          <div className="mt-2">
            <div>
              {' '}
              Chuyển hướng:{' '}
              {
                HeaderItems.find(
                  (item: any) =>
                    item.value === informationData?.NotFoundNavigate
                )?.label
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const LogoBox = ({ setIsOpen, Data, Logo }: BoxProps) => {
  const informationData: InformationProps = Data?.find(
    (item: any) => item.id === 'information'
  );

  return (
    <div className="border shadow-sm bg-white rounded-md border-gray-200 ">
      <div className="p-4 flex flex-col gap-1">
        <HeaderBox
          Title="Đóng logo vào ảnh"
          ClickedProps={() => setIsOpen('Logo')}
          Description="Xác định vị trí của logo trên tất cả ảnh được sử dụng trong website"
        />
        <div>
          <h3>Logo:</h3>
          <div className="relative mt-2  h-[150px] w-[150px]">
            <Image
              src={
                informationData?.LogoSnippet
                  ? informationData?.LogoSnippet
                  : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
              }
              alt="404 Not Found"
              fill
              className="object-contain "
            />
          </div>
        </div>
        <div className="mt-2">
          <div>
            Vị trí:{'   '}
            {
              Logo?.find(
                (item: Logo) => item.value === informationData?.LogoPosition
              )?.label
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export const FacebookBox = ({ setIsOpen, Data }: BoxProps) => {
  const informationData: InformationProps = Data?.find(
    (item: any) => item.id === 'information'
  );
  const contactData: ContactProps = Data?.find(
    (item: any) => item.id === 'contact'
  );

  return (
    <div className="border shadow-sm bg-white rounded-md border-gray-200 h-max">
      <div className="p-4 flex flex-col gap-1">
        <HeaderBox
          Title="Giao diện Facebook"
          ClickedProps={() => setIsOpen('Facebook')}
          Description="Cách hiển thị giao diện hình ảnh, thông tin và tóm tắc website của bạn khi chia sẻ trên Facebook"
        />
        <div className="border mt-2 border-blue-500">
          <div className="p-2">
            <div className="flex gap-2 items-start">
              <div className="bg-blue-500 text-white p-1 text-[24px] h-max">
                <ImFacebook />
              </div>
              <div>
                <h3 className="font-normal text-blue-700 text-[15px] leading-4">
                  Facebook
                </h3>
                <p className="text-[10px] text-gray-400 ">35 Mins</p>
              </div>
            </div>
            <div className="mt-2 border border-gray-300">
              <Image
                src={
                  informationData?.ogimage
                    ? informationData?.ogimage
                    : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                }
                alt="Facebook"
                width={500}
                height={500}
                className="w-full h-[200px] object-cover"
              />
            </div>
            <div className="border border-gray-300">
              <div className="p-2">
                <h3 className="text-gray-400  font-light">
                  {contactData?.WebsiteAddress}
                </h3>
                <h2 className="truncate1 text-[18px] font-normal">
                  {informationData?.ogtitle}
                </h2>
                <p className="text-gray-500 text-[14px] truncate2">
                  {informationData?.ogdescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const TwitterBox = ({ setIsOpen, Data }: BoxProps) => {
  const informationData: InformationProps = Data?.find(
    (item: any) => item.id === 'information'
  );
  const contactData: ContactProps = Data?.find(
    (item: any) => item.id === 'contact'
  );

  return (
    <div className="border shadow-sm bg-white rounded-md border-gray-200 h-max">
      <div className="p-4 flex flex-col gap-1">
        <HeaderBox
          Title="Giao diện Twitter"
          ClickedProps={() => setIsOpen('Twitter')}
          Description="Cách hiển thị giao diện hình ảnh, thông tin và tóm tắc website của bạn khi chia sẻ trên Twitter"
        />
        <div className="border mt-2 border-black">
          <div className="p-2">
            <div className="flex gap-2 items-start">
              <div className="bg-black text-white p-1 text-[24px] h-max">
                <FaXTwitter />
              </div>
              <div>
                <h3 className="font-normal text-black text-[15px] leading-4">
                  Twitter
                </h3>
                <p className="text-[10px] text-gray-400 ">@twitter</p>
              </div>
            </div>
            <div className="mt-2 border border-gray-300  rounded-t-3xl">
              <Image
                src={
                  informationData?.twimage
                    ? informationData?.twimage
                    : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                }
                alt="Facebook"
                width={500}
                height={500}
                className="w-full h-[200px] object-cover rounded-t-3xl"
              />
            </div>
            <div className="border border-gray-300  rounded-b-3xl">
              <div className="p-2  font-normal text-[15px]">
                <h2 className="truncate1 ">{informationData?.twtitle}</h2>
                <p className="text-gray-500  truncate2">
                  {informationData?.twdescription}
                </p>
                <div className="flex items-center gap-2 text-gray-400  font-light">
                  <FaLink className="text-[14px]" />
                  <h3 className="">{contactData?.WebsiteAddress}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const EmbedBox = ({ setIsOpen, Data }: BoxProps) => {
  const informationData: InformationProps = Data?.find(
    (item: any) => item.id === 'information'
  );

  return (
    <div className="border shadow-sm bg-white rounded-md border-gray-200 ">
      <div className="p-4 flex flex-col gap-1">
        <HeaderBox
          Title="Tích hợp dịch vụ"
          ClickedProps={() => setIsOpen('Google')}
          Description="Chỉ sử dụng được chức năng thống kê sau khi tích hợp google Analytics"
        />

        <div className="mt-2 flex flex-col gap-2">
          <p>
            <strong>Google Analytics:</strong> {informationData?.analytics}
          </p>
          <p>
            <strong>Remarketing Code:</strong> {informationData?.remakerting}
          </p>
          <div className="">
            <strong className="w-max font-normal">LiveChat Embed:</strong>
            <div className="bg-slate-100 rounded-xl mt-2">
              <div className="p-4">{informationData?.livechat}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
