'use client';
import React, { useState } from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { Tooltip } from 'antd';
import { useStateProvider } from '@context/StateProvider';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import ImageUploader from '../Handle/ImageUploader';
import TextEditor from '../TextEditor/TextEditor';

interface InputFormProps {
  Label: string;
  Type:
    | 'Upload'
    | 'Select'
    | 'Input'
    | 'Password'
    | 'TextArea'
    | 'Checkbox'
    | 'Radio'
    | 'Switch'
    | 'Slider'
    | 'DatePicker'
    | 'TimePicker'
    | 'ColorPicker'
    | 'InputNumber'
    | 'Editor'
    | 'ColorPicker';
  setState?: any;
  setUpload?: any;

  field: any;
  Tips?: string;
  Option?: any;
  PlaceHolder?: string;
}

const InputForm = ({
  Label,
  Type,

  field,
  Tips,
  Option,
  PlaceHolder,
}: InputFormProps) => {
  const { FormData, setFormData } = useStateProvider();
  const [HiddenPassword, setHiddenPassword] = useState(false);
  return (
    <>
      <div>
        {Type === 'Upload' ? (
          <>
            <div className="flex flex-col w-full gap-2 ">
              <div className="col-span-2 flex items-center gap-2 ">
                <p> {Label}:</p>
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="px-4 py-1   bg-white rounded-lg w-full col-span-6">
                <ImageUploader
                  PlaceHolder={PlaceHolder}
                  setForm={setFormData}
                  Form={FormData}
                  Field={field}
                />
              </div>
            </div>
          </>
        ) : Type === 'Editor' ? (
          <>
            <div className="flex flex-col w-full gap-2 ">
              <div className="col-span-2 flex items-center gap-2 ">
                <p> {Label}:</p>
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="px-4 py-1   bg-white rounded-lg w-full col-span-6">
                <TextEditor
                  initialValue={
                    FormData ? FormData[field] : '<p>Content...</p>'
                  }
                  onChange={setFormData}
                  Form={FormData}
                  Field={field}
                />
              </div>
            </div>
          </>
        ) : Type === 'Select' ? (
          <>
            {' '}
            <div className="grid grid-cols-8  items-center  w-full justify-between  ">
              <div className="col-span-2 flex items-center gap-2 ">
                <p> {Label}:</p>
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="px-4 py-1 border  bg-white rounded-lg w-full col-span-6">
                <select
                  className=" outline-none w-full bg-white"
                  value={FormData === undefined ? '' : FormData[field]}
                  onChange={(e) =>
                    setFormData({ ...FormData, [field]: e.target.value })
                  }
                >
                  <option key={-1}>--- Chọn Danh Mục ---</option>

                  {Option?.map((item: any, idx: number) => (
                    <>
                      {item.value !== undefined ? (
                        <option key={idx} value={item.value}>
                          {item.label}
                        </option>
                      ) : (
                        <option key={idx} value={item.url}>
                          {item.title}
                        </option>
                      )}
                    </>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : Type === 'Input' ? (
          <div className="flex  w-full justify-between  flex-col">
            <div className=" flex items-center gap-2 ">
              <p> {Label}:</p>
              {Tips && (
                <Tooltip title={Tips}>
                  <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                </Tooltip>
              )}
            </div>
            <div className="px-4 py-1 border  bg-white rounded-lg w-full mt-1 shadow-sm hover:shadow-lg duration-200">
              <input
                type="text"
                placeholder={PlaceHolder ? PlaceHolder : ''}
                className=" outline-none w-full"
                value={FormData === undefined ? '' : FormData[field]}
                onChange={(e) =>
                  setFormData({ ...FormData, [field]: e.target.value })
                }
              />
            </div>
          </div>
        ) : Type === 'InputNumber' ? (
          <div className="grid grid-cols-8  items-center  w-full justify-between  ">
            <div className="col-span-2">{Label}:</div>
            {Tips && (
              <Tooltip title={Tips}>
                <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
              </Tooltip>
            )}
            <div className="px-4 py-1 bg-white rounded-lg w-full col-span-6">
              <input
                type="number"
                className=" outline-none w-full"
                value={field ? FormData[field] : FormData}
                onChange={(e) =>
                  setFormData({ ...FormData, [field]: e.target.value })
                }
              />
            </div>
          </div>
        ) : Type === 'TextArea' ? (
          <div className="flex flex-col  w-full   ">
            <div className=" flex items-center gap-2 ">
              <p> {Label}:</p>
              {Tips && (
                <Tooltip title={Tips}>
                  <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                </Tooltip>
              )}
            </div>
            <div className="p-2 border  bg-white rounded-lg w-full mt-1 shadow-sm hover:shadow-lg duration-200">
              <textarea
                placeholder={PlaceHolder ? PlaceHolder : ''}
                className=" outline-none w-full "
                value={FormData[field] === undefined ? '' : FormData[field]}
                onChange={(e) =>
                  setFormData({ ...FormData, [field]: e.target.value })
                }
              />
            </div>
          </div>
        ) : Type === 'Checkbox' ? (
          <>
            <div className="flex  gap-5 ">
              <div className="col-span-2">
                {Label}:
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="col-span-6">
                <div>
                  {Option.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        id={`checkbox_${idx}`}
                        value={item.value}
                        checked={(FormData[field] || []).includes(item.value)}
                        onChange={(e) => {
                          const currentFormData = FormData[field] || []; // Ensure FormData[field] exists
                          if (e.target.checked) {
                            setFormData({
                              ...FormData,
                              [field]: [...currentFormData, e.target.value],
                            });
                          } else {
                            setFormData({
                              ...FormData,
                              [field]: currentFormData.filter(
                                (existingItem: any) =>
                                  existingItem !== e.target.value
                              ),
                            });
                          }
                        }}
                      />
                      <label htmlFor={`checkbox_${idx}`}>{item.label}</label>
                    </div>
                  ))}
                </div>
                {/* {field ? (
                  <>
                    <input
                      type="checkbox"
                      checked={FormData[field]}
                      className=" outline-none"
                      onChange={(e) =>
                        setFormData({ ...FormData, [field]: e.target.checked })
                      }
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <input
                      type="checkbox"
                      className=" outline-none"
                      onChange={(e) => setState(e.target.checked)}
                    />
                  </>
                )} */}
              </div>
            </div>
          </>
        ) : Type === 'Radio' ? (
          <>
            <div className="grid grid-cols-8  w-full items-start  ">
              <div className="col-span-2 flex items-center gap-2 ">
                <p> {Label}:</p>
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className=" py-1   rounded-lg w-full col-span-6">
                <div>
                  {Option.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        id={`radio_${idx}`}
                        value={item.value}
                        checked={
                          FormData ? FormData[field] === item.value : false
                        }
                        onChange={(e) =>
                          setFormData({
                            ...FormData,
                            [field]: e.target.value,
                          })
                        }
                      />
                      <label htmlFor={`radio_${idx}`}>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : Type === 'Password' ? (
          <div className="grid grid-cols-8  items-center  w-full justify-between  ">
            <div className="col-span-2 flex items-center gap-2 ">
              <p>
                {' '}
                {Label} <sup className="text-red-500">(*)</sup>:
              </p>
            </div>
            <div className="px-4 py-1 border  bg-white rounded-lg w-full col-span-6 flex items-center gap-3">
              <input
                type={HiddenPassword ? 'text' : 'password'}
                placeholder={PlaceHolder ? PlaceHolder : ''}
                className=" outline-none w-full"
                value={FormData === undefined ? '' : FormData[field]}
                onChange={(e) =>
                  setFormData({ ...FormData, [field]: e.target.value })
                }
              />
              <div
                className="cursor-pointer"
                onClick={() => setHiddenPassword(!HiddenPassword)}
              >
                {HiddenPassword ? <IoEyeSharp /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
        ) : Type === 'Slider' ? (
          <></>
        ) : Type === 'DatePicker' ? (
          <>
            <div className="grid grid-cols-8 gap-3  items-center  w-full justify-between  ">
              <div className="col-span-2">
                {Label}:
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="px-4 py-1 bg-white rounded-lg w-max col-span-6">
                <input
                  type="date"
                  className=" outline-none"
                  onChange={(e) =>
                    setFormData({ ...FormData, [field]: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        ) : Type === 'TimePicker' ? (
          <></>
        ) : Type === 'ColorPicker' ? (
          <>
            <div className="grid grid-cols-8 gap-3  items-center  w-full justify-between  ">
              <div className="col-span-2">
                {Label}:
                {Tips && (
                  <Tooltip title={Tips}>
                    <FaRegCircleQuestion className="text-[18px] cursor-pointer" />
                  </Tooltip>
                )}
              </div>
              <div className="px-4 py-1 bg-white rounded-lg w-max col-span-6">
                <input
                  type="color"
                  className="outline-none"
                  onChange={(e) => console.log('Mã màu mới:', e.target.value)}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default InputForm;
