'use client';

import useLocalStorage from '@/hooks/useLocalStorage';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { useDeepCompareEffect } from 'react-use';

import { ReactNode } from 'react';
import UserContext from '@/contexts/UserContext';

interface UserInterface {
  user: any;
  tokenPair: any;
}

const Providers = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultUser: UserInterface = { user: null, tokenPair: {} };
  const [user, setUser, isUserSet] = useLocalStorage('user', defaultUser);
  useDeepCompareEffect(() => {
    if (!isUserSet) return;
    if (!user?.user && pathname.split('/')[1] == 'account') {
      redirect('/');
    }
    if (!user?.user && pathname.split('/')[1] == 'staff') {
      redirect('/');
    }
    if (user?.user && (pathname === '/sign-in' || pathname === '/sign-up')) {
      redirect('/');
    }
    if (
      user?.user &&
      user?.user.roles[0] == 'manager' &&
      pathname.split('/')[1] != 'staff'
    ) {
      console.log('pathName', pathname.split('/'));
      redirect('/staff');
    }
    if (
      user?.user &&
      user?.user.roles[0] != 'manager' &&
      pathname.split('/')[1] == 'staff'
    ) {
      redirect('/');
    }
    console.log('provider', user);
  }, [pathname, searchParams, user, isUserSet]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      <Toaster position='bottom-center' />
    </UserContext.Provider>
  );
};

export default Providers;
