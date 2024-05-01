import React from 'react';
import localFont from 'next/font/local';

const iCielBC = localFont({
  src: '../../../../assets/fonts/iCielPequena.otf',
  display: 'swap',
});

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      {' '}
      <h1 className="text-[30px] font-semibold"> {title} </h1>
      <p className=" text-gray-500">{description}</p>
    </div>
  );
};

export default Heading;
