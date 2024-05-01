import { Tooltip } from 'antd';
import React from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import EditButton from './EditButton';

interface HeaderBoxProps {
  ClickedProps: any;
  Title: string;
  Description: string;
}

const HeaderBox = ({ ClickedProps, Title, Description }: HeaderBoxProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 font-bold text-[18px]">
        <p>{Title}</p>
        <Tooltip title={Description}>
          {' '}
          <div className="text-[20px]">
            <FaRegCircleQuestion />
          </div>
        </Tooltip>
      </div>
      <div>
        <EditButton onClick={ClickedProps} />
      </div>
    </div>
  );
};

export default HeaderBox;
