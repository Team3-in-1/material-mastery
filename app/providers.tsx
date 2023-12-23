'use client';
import '@/styles/global.css';
import useLocalStorage from '@/hooks/useLocalStorage';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useDeepCompareEffect } from 'react-use';

import { ReactNode } from 'react';
import UserContext from '@/contexts/UserContext';
import { UserInterface } from '@/utils/response';
import queryClient from '@/helpers/client';

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultUser: UserInterface = {
    userId: null,
    roles: [],
    accessToken: null,
  };
  const [user, setUser, isUserSet] = useLocalStorage('user', defaultUser);

  useDeepCompareEffect(() => {
    if (!isUserSet) return;
    if (
      !user?.userId &&
      (pathname.split('/')[1] == 'account' ||
        pathname.split('/')[1] == 'staff' ||
        pathname.split('/')[1] == 'manager')
    ) {
      redirect('/');
    }
    if (user?.userId && (pathname === '/sign-in' || pathname === '/sign-up')) {
      redirect('/');
    }
    if (
      user?.userId &&
      user?.roles[0] == 'staff' &&
      pathname.split('/')[1] != 'staff'
    ) {
      queryClient.clear();

      redirect('/staff');
    }
    if (
      user?.userId &&
      user?.roles[0] != 'staff' &&
      pathname.split('/')[1] == 'staff'
    ) {
      redirect('/');
    }
    if (
      user?.userId &&
      user?.roles[0] == 'manager' &&
      pathname.split('/')[1] != 'manager'
    ) {
      queryClient.clear();

      redirect('/manager');
    }
    if (
      user?.userId &&
      user?.roles[0] != 'manager' &&
      pathname.split('/')[1] == 'manager'
    ) {
      redirect('/');
    }
  }, [pathname, searchParams, user, isUserSet]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      <Toaster position='bottom-center' />
    </UserContext.Provider>
  );
};

export default Providers;
