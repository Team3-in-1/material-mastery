'use client';
import '../../app/global.css';
import '@mantine/core/styles.css';
import NextImage from 'next/image';
import { Flex, Group, Image, Text, Anchor, Menu, rem } from '@mantine/core';
import logo from '@/public/icon.svg';
import Search from '../Search/search';
// import '../../app/global.css';
import LanguagePicker from '../LanguagePicker/languagePicker';
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
import { userService } from '@/services/userService';
import { UserInterface } from '@/utils/response';

interface OnClickInterface {
  [index: string]: Function;
}

const LoggedHeader = ({ user, setUser }: { user: any; setUser: any }) => {
  const router = useRouter();
  const cartFromServer = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      const cartService = new CartService(user);
      return cartService.getCart();
    },
    enabled: !!user.userId && user?.roles[0] != 'manager',
    //staleTime: Infinity,
    retry: 5,
    gcTime: 0,
  });

  const onClickFunction: OnClickInterface = {
    details: () => {
      router.push('/account/details');
    },
    orders: () => {
      router.push('/account/orders');
    },
    signOut: () => {
      userService.signOut(user);
      setUser({
        userId: null,
        roles: [],
        accessToken: null,
      });
      queryClient.clear();
    },
  };
  const handleOnClickOnMenu = (type: string) => {
    return onClickFunction[type]();
  };
  if (cartFromServer.failureCount == 5 && user) {
    onClickFunction.signOut();
  }

  return (
    <Flex gap='1rem' align='center' className='hidden-mobile'>
      {/* <LanguagePicker /> */}
      {user?.roles[0] != 'manager' && (
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
          {user?.roles[0] != 'manager' && (
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
