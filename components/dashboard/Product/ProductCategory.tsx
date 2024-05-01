'use client';

import React, { useState } from 'react';

import Category from './ProductCategory/Category';
import Sale from './ProductCategory/Sale';
import {
  ProductCategoryProps,
  ProductProps,
  SaleDataProps,
  SaleInfoProps,
} from '@assets/TypeProps';

interface ProductCategory {
  CategoryData: ProductCategoryProps[];
  SaleInfo: SaleInfoProps;
  SaleData: SaleDataProps[];
  ProductData: ProductProps[];
}

const ProductCategory = ({
  CategoryData,
  SaleInfo,
  SaleData,
  ProductData,
}: ProductCategory) => {
  return (
    <div className="w-full h-[90vh] grid p:grid-cols-1 d:grid-cols-2 p:px-0 d:px-4 font-light gap-4  ">
      <div className="  bg-white border border-slate-300 rounded-lg">
        <div className="p-4">
          <Category Data={CategoryData} />
        </div>
      </div>
      <div className="  bg-white border border-slate-300 rounded-lg">
        <div className="p-4">
          <Sale SaleInfo={SaleInfo} Data={SaleData} ProductData={ProductData} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
