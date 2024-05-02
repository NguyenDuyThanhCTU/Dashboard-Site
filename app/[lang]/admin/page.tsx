import { AccountProps } from '@assets/props';
import AccountIF from '@components/dashboard/Account/AccountIF';
import General from '@components/dashboard/Account/General';
import AdminPage from '@components/dashboard/AdminPage';
import Collection from '@components/dashboard/Comunity/Collection';
import Slide from '@components/dashboard/Comunity/Slide';
import SocialMedia from '@components/dashboard/Comunity/SocialMedia/SocialMedia';
import ConfigPage from '@components/dashboard/Config/ConfigPage';
import Branch from '@components/dashboard/Plugins/Branch';
import Plugins from '@components/dashboard/Plugins/Plugins';
import PostsCategory from '@components/dashboard/Posts/Category';
import PostIntroductory from '@components/dashboard/Posts/Introductory';
import Posts from '@components/dashboard/Posts/Posts';
import ProductCategory from '@components/dashboard/Product/ProductCategory';
import ListProduct from '@components/dashboard/Product/ProductList';
import FeedBack from '@components/dashboard/Report/FeedBack/FeedBack';
import Header from '@components/layout/dashboard/Header';
import { find, findById } from '@config/api/api';
import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import Error from '@components/dashboard/Authorization/Error';
import { firebaseConfig } from '@config/firebase/firebase';

export const metadata: Metadata = {
  title: 'Quản trị website',
};

interface DashboardPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: 'vi' | 'cn' | 'en' };
}

const DashboardPage = async ({ searchParams, params }: DashboardPageProps) => {
  const searchValue = searchParams.tab;
  const keyValue: any = searchParams.key;

  const strCurrentUser = atob(keyValue);
  const CurrentUser = JSON.parse(strCurrentUser);

  const ConfigData = await find(CurrentUser, 'Config', true);
  const ProductsData = await find(CurrentUser, 'Products', true);
  const PostsData = await find(CurrentUser, 'Posts', true);
  const dict = await getDictionary(params.lang);
  let componentToRender;
  switch (searchValue) {
    case 'home':
      componentToRender = <AdminPage Data={PostsData} />;
      break;
    case 'cau-hinh':
      componentToRender = <ConfigPage Data={ConfigData} />;
      break;
    // case 'danh-sach-san-pham':
    //   const ProductCategoryTag = await find(
    //     CurrentUser.firebaseConfig,
    //     'ProductCategory',
    //     true
    //   );
    //   componentToRender = (
    //     <ListProduct Category={ProductCategoryTag} Data={ProductsData} />
    //   );
    //   break;
    // case 'danh-muc-san-pham':
    //   const Type = await find(
    //     CurrentUser.firebaseConfig,
    //     'ProductCategory',
    //     true
    //   );
    //   const SaleData = await find(CurrentUser.firebaseConfig, 'Sale', true);
    //   const SaleInfo = ConfigData?.find(
    //     CurrentUser.firebaseConfig,
    //     (item: any) => item.id === 'sales',
    //     true
    //   );
    //   componentToRender = (
    //     <ProductCategory
    //       CategoryData={Type}
    //       SaleInfo={SaleInfo}
    //       SaleData={SaleData}
    //       ProductData={ProductsData}
    //     />
    //   );
    //   break;
    // case 'danh-sach-bai-viet':
    //   const CategoryData = await find(
    //     CurrentUser.firebaseConfig,
    //     'PostCategory',
    //     true
    //   );
    //   const filterData = PostsData?.filter(
    //     (items: any) => items.id !== 'introductory'
    //   );
    //   componentToRender = (
    //     <Posts PostsData={filterData} Category={CategoryData} />
    //   );
    //   break;
    // case 'danh-muc-bai-viet':
    //   const Category = await find(
    //     CurrentUser.firebaseConfig,
    //     'PostCategory',
    //     true
    //   );
    //   componentToRender = <PostsCategory Data={Category ? Category : []} />;
    //   break;

    // case 'bai-gioi-thieu':
    //   const Introductory: any = await findById(
    //     CurrentUser.firebaseConfig,
    //     'Posts',
    //     'introductory',
    //     true
    //   );
    //   componentToRender = <PostIntroductory Data={Introductory} />;
    //   break;
    // case 'kenh-truyen-thong':
    //   const SocialMediaData = await findById(
    //     CurrentUser.firebaseConfig,
    //     'Config',
    //     'SocialMedia'
    //   );
    //   componentToRender = <SocialMedia Data={SocialMediaData} />;
    //   break;
    // case 'slide-gioi-thieu':
    //   const SlideData = await find(CurrentUser.firebaseConfig, 'Slides', true);

    //   componentToRender = (
    //     <Slide
    //       ProductsData={ProductsData}
    //       PostsData={PostsData}
    //       Data={SlideData}
    //     />
    //   );
    //   break;

    // case 'doi-tac':
    //   const PartnerData = await find(
    //     CurrentUser.firebaseConfig,
    //     'Partner',
    //     true
    //   );
    //   componentToRender = <Plugins Data={PartnerData} />;
    //   break;
    // case 'chi-nhanh':
    //   const BranchData = await find(
    //     CurrentUser.firebaseConfig,
    //     'Branches',
    //     true
    //   );
    //   componentToRender = <Branch Data={BranchData} />;
    //   break;
    // case 'bo-suu-tap':
    //   const CollectionData = await find(
    //     CurrentUser.firebaseConfig,
    //     'Collections',
    //     true
    //   );
    //   const ImageFiltered = CollectionData?.filter(
    //     (item: any) => item.type === 'hinh-anh'
    //   );
    //   const VideoFiltered = CollectionData?.filter(
    //     (item: any) => item.type === 'video'
    //   );
    //   componentToRender = (
    //     <Collection
    //       collectionLength={
    //         CollectionData === undefined
    //           ? 0
    //           : CollectionData[0]?.stt === undefined
    //           ? 0
    //           : CollectionData[0]?.stt + 1
    //       }
    //       ImageFiltered={ImageFiltered}
    //       VideoFiltered={VideoFiltered}
    //     />
    //   );
    //   break;
    // case 'phan-hoi-cua-khach-hang':
    //   const FeedBackData = await find(
    //     CurrentUser.firebaseConfig,
    //     'FeedBacks',
    //     true
    //   );

    //   componentToRender = <FeedBack Data={FeedBackData} />;
    //   break;
    case 'thong-tin-tai-khoan':
      componentToRender = <AccountIF />;
      break;
    case 'quan-ly-tai-khoan':
      const AccountData = await find(firebaseConfig, 'Accounts', true);
      if (CurrentUser?.role === 'admin') {
        componentToRender = <General Data={AccountData} />;
      } else {
        componentToRender = <Error />;
      }
      break;
    default:
      componentToRender = null;
  }

  return (
    <>
      <Header dict={dict} Key={keyValue} />
      <div className="p:mt-[84px] d:mt-[64px] bg-slate-100 py-5  d:mx-auto p:mx-2 d:text-[18px] p:text-[14px]">
        {componentToRender}
      </div>
    </>
  );
};

export default DashboardPage;

//eyJzdHQiOiIwIiwiaWQiOiIxMDAwMDAwMDAwMDAiLCJuYW1lIjoiVGhhbmgxYWFhYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluQCIsInJvbGUiOiJhZG1pbiIsImRhdGUiOiJUaOG7qSBOxINtLCAyNS80LzIwMjQiLCJmaXJlYmFzZUNvbmZpZyI6eyJhcGlLZXkiOiJBSXphU3lCT3gxRjJ3YkRDbHlHamstNFhDTVRFZzBsNVlHTEdNUTgiLCJhcHBJZCI6IjE6NDg4NzcyMTY1NjU5OndlYjpiMWEzNTc4OTlkNDU5ZjA0ODAxOGJlIiwiYXV0aERvbWFpbiI6ImFkc3NpdGUtMTNhZGMuZmlyZWJhc2VhcHAuY29tIiwic3RvcmFnZUJ1Y2tldCI6ImFkc3NpdGUtMTNhZGMuYXBwc3BvdC5jb20iLCJtZWFzdXJlbWVudElkIjoiRy0xNDkyRUM2RkhMIiwibWVzc2FnaW5nU2VuZGVySWQiOiI0ODg3NzIxNjU2NTkiLCJwcm9qZWN0SWQiOiJhZHNzaXRlLTEzYWRjIn0sImFwaUtleSI6IkFJemFTeUJPeDFGMndiRENseUdqay00WENNVEVnMGw1WUdMR01ROCIsInByb2plY3RJZCI6ImFkc3NpdGUtMTNhZGMiLCJtZXNzYWdpbmdTZW5kZXJJZCI6IkctMTQ5MkVDNkZITCIsImFwcElkIjoiMTo0ODg3NzIxNjU2NTk6d2ViOmIxYTM1Nzg5OWQ0NTlmMDQ4MDE4YmUiLCJtZWFzdXJlbWVudElkIjoiRy0xNDkyRUM2RkhMIn0%3D
