'use client';

import { useAuth } from '@context/AuthProviders';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { setCurrentUser, setUserKey } = useAuth();
  const verify = true;
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue: any = searchParams.get('key');
  const strCurrentUser = atob(searchValue);
  const CurrentUser = JSON.parse(strCurrentUser);
  useEffect(() => {
    console.log(CurrentUser);
    setCurrentUser(CurrentUser);
    setUserKey(searchValue);
  }, []);
  if (!verify) {
    return router.push('/');
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
