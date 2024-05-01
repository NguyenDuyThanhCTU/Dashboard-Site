'use client';
import React from 'react';
import InformationConfig from './Section/InformationConfig';
import ContactConfig from './Section/ContactConfig';
import SeoConfig from './Section/SeoConfig';

const ConfigPage = ({ Data }: { Data: Array<any> }) => {
  const contactData = Data?.find((item: any) => item.id === 'contact');
  return (
    <div>
      <InformationConfig Data={Data} />
      <ContactConfig Data={contactData} />
      <SeoConfig Data={Data} />
    </div>
  );
};

export default ConfigPage;
