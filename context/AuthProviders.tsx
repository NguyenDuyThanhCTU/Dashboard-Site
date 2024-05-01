'use client';
import {
  AccountProps,
  FirebaseConfigProps,
  PostProps,
  ProductProps,
} from '@assets/props';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
import { useStateProvider } from './StateProvider';

interface Props {
  children: React.ReactNode;
}

export type AuthContextType = {
  verify: boolean;
  setVerify: (state: boolean) => void;
  currentUser: AccountProps;
  setCurrentUser: (currentUser: any) => void;
  ConfigData: any;
  setConfigData: (ConfigData: any) => void;
  ProductsData: ProductProps[];
  setProductsData: (ProductsData: any) => void;
  PostsData: PostProps[];
  setPostsData: (PostsData: any) => void;
  HandleDashboardNavigate: (url: any) => void;
  isUserKey: string;
  setUserKey: (isUserKey: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  verify: false,
  setVerify: () => {},
  currentUser: {
    stt: 0,
    id: '',
    name: '',
    username: '',
    password: '',
    role: 'user',
    apiKey: '',
    appId: '',
    firebaseConfig: {
      apiKey: '',
      appId: '',
      authDomain: '',
      storageBucket: '',
      measurementId: '',
      messagingSenderId: '',
      projectId: '',
    },
    measurementId: '',
    messagingSenderId: '',
    projectId: '',
    date: '',
    image: '',
    phone: '',
    email: '',
  },
  setCurrentUser: () => {},
  ConfigData: [],
  setConfigData: () => {},
  ProductsData: [],
  setProductsData: () => {},
  PostsData: [],
  setPostsData: () => {},
  HandleDashboardNavigate: () => {},
  isUserKey: '',
  setUserKey: () => {},
});

export const AuthProviders = ({ children }: Props) => {
  const { setIsLoading } = useStateProvider();
  const [verify, setVerify] = useState(false);
  const [isUserKey, setUserKey] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<AccountProps>({
    stt: 0,
    id: '',
    name: '',
    username: '',
    password: '',
    role: 'user',
    apiKey: '',
    appId: '',
    firebaseConfig: {
      apiKey: '',
      appId: '',
      authDomain: '',
      storageBucket: '',
      measurementId: '',
      messagingSenderId: '',
      projectId: '',
    },
    measurementId: '',
    messagingSenderId: '',
    projectId: '',
    date: '',
    image: '',
    phone: '',
    email: '',
  });
  const [ConfigData, setConfigData] = useState<Array<any>>([]);
  const [ProductsData, setProductsData] = useState<ProductProps[]>([]);
  const [PostsData, setPostsData] = useState<PostProps[]>([]);

  const router = useRouter();
  const HandleDashboardNavigate = (url: any) => {
    router.push(`${url}&key=${isUserKey}`);
    setIsLoading(1000);
  };
  return (
    <AuthContext.Provider
      value={{
        HandleDashboardNavigate,
        isUserKey,
        setUserKey,
        verify,
        setVerify,
        currentUser,
        setCurrentUser,
        ConfigData,
        setConfigData,
        ProductsData,
        setProductsData,
        PostsData,
        setPostsData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
