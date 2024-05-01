'use client';

import { extractSrc } from '@components/dashboard/items/Handle/Handle';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { updateOne } from '@config/api/api';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';

import { useRouter } from 'next/navigation';
import React from 'react';

const Handle = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const router = useRouter();
  const { setFormData, FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'contact',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });

    router.refresh();
  };

  const HandleCheckGoogleMap = () => {
    const url = extractSrc(FormData?.GoogleMap);
    setFormData({ ...FormData, GoogleMap: url });
  };

  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="grid p:grid-cols-1 d:grid-cols-2 gap-2">
            <div className="border border-black rounded-lg">
              <div className="p-2 flex flex-col gap-2">
                <InputForm
                  Label="Địa chỉ website"
                  Type="Input"
                  field={'WebsiteAddress'}
                />
                <InputForm
                  Label="Số điện thoại"
                  Type="Input"
                  field={'Hotline'}
                />

                <InputForm
                  Label="Số điện thoại (phụ)"
                  Type="Input"
                  field={'PhoneNumber'}
                />
                <InputForm
                  Label="Hotline hỗ trợ kỹ thuật"
                  Type="Input"
                  field={'TechnicalHotline'}
                />
              </div>
            </div>
            <div className="border border-black rounded-lg">
              <div className="p-2 flex flex-col gap-2">
                <InputForm Label="Email" Type="Input" field={'Email'} />
                <InputForm
                  Label="Thời gian hoạt động website"
                  Type="Input"
                  field={'WebsiteTime'}
                />
                <InputForm
                  Label="Thời gian hoạt động của công ty"
                  Type="Input"
                  field={'CompanyTime'}
                />
              </div>
            </div>
          </div>
          <div className="border border-black rounded-lg">
            <div className="p-2 flex flex-col gap-2">
              <InputForm
                Label="Địa chỉ (chi nhánh chính)"
                Type="Input"
                field={'CompanyAddress'}
              />
              <InputForm
                Label="Liên kết chỉ đường"
                Type="Input"
                field={'direct'}
              />
              <div className="grid grid-cols-2 gap-2">
                <InputForm
                  Label="Logo website"
                  Type="Upload"
                  field={'LogoWebsite'}
                />
                <div>
                  <InputForm
                    Label="Vị trí (Google map)"
                    Type="Input"
                    field={'GoogleMap'}
                  />
                  {FormData?.GoogleMap && (
                    <div className="flex mt-2 gap-2">
                      <div>
                        <div
                          className="py-2 px-5 rounded-lg cursor-pointer bg-lime-400 w-max hover:bg-lime-600 duration-300"
                          onClick={() => HandleCheckGoogleMap()}
                        >
                          Kiểm tra
                        </div>
                      </div>
                      <iframe
                        src={FormData?.GoogleMap}
                        loading="lazy"
                        className="w-full h-full outline-none"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Cập nhật
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handle;
