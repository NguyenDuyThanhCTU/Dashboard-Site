import {
  IoImagesOutline,
  IoListSharp,
  IoSettingsOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { BsPostcard, BsFileEarmarkPost } from 'react-icons/bs';
import { AiOutlineProfile } from 'react-icons/ai';

import {
  BiCube,
  BiHappy,
  BiHive,
  BiLoader,
  BiPencil,
  BiSlideshow,
  BiSolidUserAccount,
} from 'react-icons/bi';
import { TbReport } from 'react-icons/tb';
import { MdManageAccounts } from 'react-icons/md';
import { CgListTree } from 'react-icons/cg';
import { GiStarSattelites } from 'react-icons/gi';

import { CiBoxList } from 'react-icons/ci';

import { PiCirclesThreePlusDuotone, PiShareNetworkLight } from 'react-icons/pi';
import { LuGitCompare } from 'react-icons/lu';
import { GoGitBranch } from 'react-icons/go';
interface IconMappingType {
  [key: string]: IconType;
}

export const DashboardMapping: IconMappingType = {
  IoSettingsOutline: IoSettingsOutline,
  GiStarSattelites: GiStarSattelites,
  PiCirclesThreePlusDuotone: PiCirclesThreePlusDuotone,
  CiBoxList: CiBoxList,
  BsPostcard: BsPostcard,
  IoListSharp: IoListSharp,
  CgListTree: CgListTree,
  BsFileEarmarkPost: BsFileEarmarkPost,
  IoShareSocialOutline: IoShareSocialOutline,
  PiShareNetworkLight: PiShareNetworkLight,
  BiSlideshow: BiSlideshow,
  IoImagesOutline: IoImagesOutline,
  MdManageAccounts: MdManageAccounts,
  AiOutlineProfile: AiOutlineProfile,
  BiSolidUserAccount: BiSolidUserAccount,
  TbReport: TbReport,
  BiLoader: BiLoader,
  BiPencil: BiPencil,
  BiCube: BiCube,
  BiHappy: BiHappy,
  BiHive: BiHive,
  GoGitBranch: GoGitBranch,
  LuGitCompare: LuGitCompare,
};

export const DashboardHeaderItems = [
  {
    label: 'Cấu Hình',
    value: 'cau-hinh',
    icon: 'IoSettingsOutline',
    children: [],
  },
  {
    label: 'Sản Phẩm',
    value: 'danh-sach-san-pham',
    icon: 'GiStarSattelites',
    children: [
      {
        label: 'Danh Sách Sản Phẩm',
        value: 'danh-sach-san-pham',
        icon: 'PiCirclesThreePlusDuotone',
      },
      {
        label: 'Danh Mục Sản Phẩm',
        value: 'danh-muc-san-pham',
        icon: 'CiBoxList',
      },
    ],
  },
  {
    label: 'Bài Viết',
    value: 'danh-sach-bai-viet',
    icon: 'BsPostcard',
    children: [
      {
        label: 'Danh Sách Bài Viết',
        value: 'danh-sach-bai-viet',
        icon: 'IoListSharp',
      },
      {
        label: 'Danh Mục Bài Viết',
        value: 'danh-muc-bai-viet',
        icon: 'CgListTree',
      },

      {
        label: 'Bài giới thiệu',
        value: 'bai-gioi-thieu',
        icon: 'BsFileEarmarkPost',
      },
    ],
  },
  {
    label: 'Truyền Thông',
    value: 'kenh-truyen-thong',
    icon: 'IoShareSocialOutline',
    children: [
      {
        label: 'Kênh Truyền Thông',
        value: 'kenh-truyen-thong',
        icon: 'PiShareNetworkLight',
      },
      {
        label: 'Slide giới thiệu',
        value: 'slide-gioi-thieu',
        icon: 'BiSlideshow',
      },
      {
        label: 'Bộ sưu tập',
        value: 'bo-suu-tap',
        icon: 'IoImagesOutline',
      },
    ],
  },
  {
    label: 'Tài Khoản',
    value: 'thong-tin-tai-khoan',
    icon: 'MdManageAccounts',
    children: [
      {
        label: 'Thông Tin Tài Khoản',
        value: 'thong-tin-tai-khoan',
        icon: 'AiOutlineProfile',
      },
      {
        label: 'Quản Lý Tài Khoản',
        value: 'quan-ly-tai-khoan',
        icon: 'BiSolidUserAccount',
      },
    ],
  },
  {
    label: 'Báo Cáo',
    value: 'bao-cao',
    icon: 'TbReport',
    children: [
      {
        label: 'Lượt Truy Cập',
        value: 'luot-truy-cap',
        icon: 'BiLoader',
      },
      {
        label: 'Phản Hồi của Khách Hàng',
        value: 'phan-hoi-cua-khach-hang',
        icon: 'BiPencil',
      },
      {
        label: 'Đơn Hàng',
        value: 'don-hang',
        icon: 'BiCube',
      },
      {
        label: 'Sản Phẩm Xem Nhiều',
        value: 'san-pham-xem-nhieu',
        icon: 'BiHappy',
      },
    ],
  },
  {
    label: 'Tiện Ích',
    value: 'dich-vu',
    icon: 'BiHive',
    children: [
      {
        label: 'Chi Nhánh',
        value: 'chi-nhanh',
        icon: 'GoGitBranch',
      },
      {
        label: 'Đối Tác',
        value: 'doi-tac',
        icon: 'LuGitCompare',
      },
    ],
  },
];

export const FunctionItem = [
  {
    label: 'Hướng dẫn quản trị',
    value: '/',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/book.png?alt=media&token=08690163-3f6a-40b4-a6af-23d266c2efbf',
  },
  {
    label: 'Cấu Hình Chung',
    value: '/admin/?tab=cau-hinh',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/settings.png?alt=media&token=a8a90b1f-9e60-4e7c-a85c-cc282bb6031d',
  },
  {
    label: 'Tối Ưu SEO',
    value: '/admin/?tab=cau-hinh',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/search-engine-optimization.png?alt=media&token=7076503f-c260-4090-8a74-2339d9b0fb3c',
  },
  {
    label: 'Quản Lý Danh Mục Bài Viết',
    value: '/admin/?tab=danh-muc-bai-viet',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/app.png?alt=media&token=5366ef4b-af86-404a-a02c-67206b174ee8',
  },
  {
    label: 'Quản Lý Danh Sách Bài Viết',
    value: '/admin/?tab=danh-sach-bai-viet',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/categories.png?alt=media&token=3ec19f87-15f3-4a8f-97aa-fa1d3f06ad2c',
  },
  {
    label: 'Kênh Truyền Thông',
    value: '/admin/?tab=kenh-truyen-thong',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/social-media.png?alt=media&token=16b9f3a4-6035-4d4e-839b-c2a6f8f46dfc',
  },
  {
    label: 'Quản Lý Tài Khoản',
    value: '/admin/?tab=quan-ly-tai-khoan',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/working.png?alt=media&token=b57dc690-c7ab-4073-96bb-b3c09858a7bc',
  },
  {
    label: 'Quản Lý Các Slide Giới Thiệu',
    value: '/admin/?tab=slide-gioi-thieu',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/slide-show.png?alt=media&token=87d64e17-1a28-4116-9daf-b96ce9f558c5',
  },
  {
    label: 'Tối Ưu SEO Sản Phẩm',
    value: '/admin/?tab=danh-sach-san-pham',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/seo.png?alt=media&token=41afe929-186a-441b-a0d3-6eb6e84a04eb',
  },
  {
    label: 'Tối Ưu SEO Bài Viết',
    value: '/admin/?tab=danh-sach-bai-viet',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/seo(1).png?alt=media&token=8890b74b-ee28-4ea9-bf9d-21acd1686c00',
  },
  {
    label: 'Điều khoản dịch vụ',
    value: '/admin/?tab=danh-sach-bai-viet',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/privacy-policy.png?alt=media&token=9c6b5ac6-632e-4b86-bf0d-b137314973c7',
  },
  {
    label: 'Quản Lý Đơn Hàng',
    value: '/admin?tab=don-hang',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/bill.png?alt=media&token=94493a65-4184-4fec-96bf-ccb3ade49c0b',
  },
  {
    label: 'Quản Lý Các Đối Tác',
    value: '/admin/?tab=doi-tac',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/partner.png?alt=media&token=4e0f99cb-23c4-462d-a9ab-320575fe2583',
  },
  {
    label: 'Góp Ý Của Khách Hàng',
    value: '/admin/?tab=bao-cao',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/satisfaction.png?alt=media&token=99138c99-0f77-48b1-96a2-bc8a1d45e5aa',
  },
  {
    label: 'Quản Lý Các Chi Nhánh',
    value: '/admin/?tab=chi-nhanh',
    image:
      'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/branch.png?alt=media&token=86a20ee2-6e06-4e7d-84fb-412f89177ca0',
  },
];
