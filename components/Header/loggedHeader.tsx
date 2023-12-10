'use client';
import NextImage from 'next/image';
import { Flex, Group, Image, Text, Anchor, Menu, rem } from '@mantine/core';
import logo from '@/public/icon.svg';
import Search from '../Search/search';
// import '../../app/global.css';
import LanguagePicker from '../LanguagePicker/languagePicker';
import '@mantine/core/styles.css';
import {
  IconShoppingCart,
  IconUserCircle,
  IconLogout,
  IconUser,
  IconChecklist,
  IconTicket,
} from '@tabler/icons-react';
import classes from './header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLogin from '@/helpers/useLogin';
import { useQuery } from '@tanstack/react-query';
import CartService from '@/services/cartService';
import { useEffect, useRef, useState } from 'react';
import queryClient from '@/helpers/client';
import dynamic from 'next/dynamic';

interface OnClickInterface {
  [index: string]: Function;
}

const LoggedHeader = ({ user, setUser }: { user: any; setUser: any }) => {
  const userObject = typeof user == 'string' ? JSON.parse(user) : user;

  const router = useRouter();
  const cartFromServer = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      console.log('Get cart');

      const cartService = new CartService(userObject);
      return cartService.getCart();
    },
    enabled: !!user,
    //staleTime: Infinity,
    retry: 5,
  });

  if (cartFromServer.failureCount == 5 && userObject) {
    console.log('Get cart fail');
    setUser();
  }

  const onClickFunction: OnClickInterface = {
    details: () => {
      router.prefetch('/account/details');
      router.push('/account/details');
    },
    orders: () => {
      router.prefetch('/account/orders');
      router.push('/account/orders');
    },
    signOut: () => {
      setUser({});
    },
  };
  const handleOnClickOnMenu = (type: string) => {
    return onClickFunction[type]();
  };

  return (
    <Flex gap='1rem' align='center' className='hidden-mobile'>
      {/* <LanguagePicker /> */}
      {user?.user.roles[0] != 'manager' && (
        <div className=' relative w-[25px] h-[25px] cursor-pointer'>
          <IconShoppingCart
            onClick={() => {
              router.prefetch('/cart');
              router.push('/cart');
            }}
            color='#02B1AB'
            className={classes.hoverIcon}
          />
          {cartFromServer.data?.cart_products.length != 0 && (
            <Text
              c='red'
              fw={700}
              className='absolute top-[-10px] right-[-10px] text-[red] font-bold'
            >
              {cartFromServer.data?.cart_products.length &&
              cartFromServer.data?.cart_products.length > 99
                ? '+99'
                : cartFromServer.data?.cart_products.length}
            </Text>
          )}
        </div>
      )}
      <Menu trigger='hover' openDelay={100} closeDelay={400} zIndex={1002}>
        <Menu.Target>
          <IconUserCircle color='#02B1AB' className={classes.hoverIcon} />
        </Menu.Target>
        <Menu.Dropdown>
          {user?.user.roles[0] != 'manager' && (
            <>
              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleOnClickOnMenu('details')}
              >
                Thông tin tài khoản
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconChecklist style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleOnClickOnMenu('orders')}
              >
                Đơn hàng
              </Menu.Item>
            </>
          )}

          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => handleOnClickOnMenu('signOut')}
          >
            Đăng xuất
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default dynamic(() => Promise.resolve(LoggedHeader), { ssr: false });
