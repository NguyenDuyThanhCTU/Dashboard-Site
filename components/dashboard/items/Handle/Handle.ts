'use client';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { CiMail } from 'react-icons/ci';
import { AccountProps } from '@assets/props';

const CurrentUserStorage: any = localStorage.getItem('currentUser');
const CurrentUser: AccountProps = JSON.parse(CurrentUserStorage);

const app = initializeApp(CurrentUser.firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(app);

export const uploadImage = async (fileOrEvent: any, locate: any) => {
  try {
    let selectImage;
    if (fileOrEvent.target && fileOrEvent.target.files) {
      selectImage = fileOrEvent.target.files[0];
    } else {
      selectImage = fileOrEvent;
    }

    const filetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      let storageRef = ref(storage, `${locate}/${selectImage.name}`);

      const snapshot = await uploadBytes(storageRef, selectImage);
      console.log('Uploaded a blob or file!');

      const url = await getDownloadURL(snapshot.ref);

      return url;
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const convertListIdToProduct = (
  listId: string[],
  listProduct: any[]
) => {
  let result: any[] = [];
  listId?.forEach((id) => {
    const product = listProduct.find((product) => product.id === id);
    if (product) {
      result.push(product);
    }
  });
  return result;
};

export const convertDate = (date: Date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const;
  return date?.toLocaleDateString('vi-VN', options);
};

export const convertToChartArray = (items: any) => {
  return items.map((item: any) => item.label);
};

export const extractSrc = (embedCode: string) => {
  if (!embedCode) {
    return null;
  }

  // Tìm index của 'src="' trong đoạn mã nhúng
  const srcIndex = embedCode.indexOf('src="');
  if (srcIndex === -1) {
    return null;
  }

  // Tìm index của kết thúc của URL src
  const srcStart = srcIndex + 5; // Bắt đầu sau 'src="'
  const srcEnd = embedCode.indexOf('"', srcStart);

  // Trích xuất URL src từ đoạn mã nhúng
  const srcUrl = embedCode.substring(srcStart, srcEnd);
  return srcUrl;
};
