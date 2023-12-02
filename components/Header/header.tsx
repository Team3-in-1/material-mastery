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
import LoggedHeader from './loggedHeader';

// interface OnClickInterface {
//   [index: string]: Function;
// }

export default function Header() {
  const appName = 'Material Mastery';
  const router = useRouter();

  const [user, setUser] = useLogin();

  // const cartFromServer = useQuery({
  //   queryKey: ['cart'],
  //   queryFn: () => {
  //     const cartService = new CartService();
  //     return cartService.getCart();
  //   },
  //   // enabled: !!user,
  //   staleTime: Infinity,
  //   retryDelay: 1000,
  //   retry: 5,
  // });

  // if (cartFromServer.isError && cartFromServer.failureCount == 5 && user) {
  //   console.log('Get cart fail');
  //   setUser();
  // }

  // const onClickFunction: OnClickInterface = {
  //   details: () => {
  //     router.prefetch('/account/details');
  //     router.push('/account/details');
  //   },
  //   orders: () => {
  //     router.prefetch('/account/orders');
  //     router.push('/account/orders');
  //   },
  //   vouchers: () => {
  //     router.prefetch('/account/vouchers');
  //     router.push('/account/vouchers');
  //   },
  //   signOut: () => {
  //     setUser();
  //     router.prefetch('/');
  //     router.replace('/');
  //   },
  // };
  // const handleOnClickOnMenu = (type: string) => {
  //   return onClickFunction[type]();
  // };

  return (
    <Flex
      justify='space-between'
      align='center'
      bg='white'
      pos='fixed'
      top='0'
      left='0'
      right='0'
      className={`z-1000 ${classes.header}`}
      maw='100%'
    >
      <Link href='/'>
        {/* //underline='never' */}
        <Group wrap='nowrap'>
          <Image
            component={NextImage}
            src={logo}
            alt='Logo'
            w='2.5rem'
            h='2.5rem'
            fit='fill'
          ></Image>
          <Text
            className='hidden-mobile'
            size='1rem'
            fw='900'
            c='turquoise.6'
            lh='1.1875rem'
          >
            {appName}
          </Text>
        </Group>
      </Link>
      <Search content='' />

      {user ? (
        // <Flex gap='1rem' align='center' className='hidden-mobile'>
        //   {/* <LanguagePicker /> */}
        //   <div className=' relative w-[25px] h-[25px] cursor-pointer'>
        //     <IconShoppingCart
        //       onClick={() => {
        //         router.prefetch('/cart');
        //         router.push('/cart');
        //       }}
        //       color='#02B1AB'
        //       className={classes.hoverIcon}
        //     />
        //     {cartFromServer.data?.cart_products.length != 0 && (
        //       <Text
        //         color='red'
        //         fw={700}
        //         className='absolute top-[-10px] right-[-10px] text-[red] font-bold'
        //       >
        //         {cartFromServer.data?.cart_products.length &&
        //         cartFromServer.data?.cart_products.length > 99
        //           ? '+99'
        //           : cartFromServer.data?.cart_products.length}
        //       </Text>
        //     )}
        //   </div>
        //   <Menu trigger='hover' openDelay={100} closeDelay={400} zIndex={1002}>
        //     <Menu.Target>
        //       <IconUserCircle color='#02B1AB' className={classes.hoverIcon} />
        //     </Menu.Target>
        //     <Menu.Dropdown>
        //       <Menu.Item
        //         leftSection={
        //           <IconUser style={{ width: rem(14), height: rem(14) }} />
        //         }
        //         onClick={() => handleOnClickOnMenu('details')}
        //       >
        //         Thông tin tài khoản
        //       </Menu.Item>
        //       <Menu.Item
        //         leftSection={
        //           <IconChecklist style={{ width: rem(14), height: rem(14) }} />
        //         }
        //         onClick={() => handleOnClickOnMenu('orders')}
        //       >
        //         Đơn hàng
        //       </Menu.Item>
        //       <Menu.Item
        //         leftSection={
        //           <IconTicket style={{ width: rem(14), height: rem(14) }} />
        //         }
        //         onClick={() => handleOnClickOnMenu('vouchers')}
        //       >
        //         Kho voucher
        //       </Menu.Item>
        //       <Menu.Item
        //         leftSection={
        //           <IconLogout style={{ width: rem(14), height: rem(14) }} />
        //         }
        //         onClick={() => handleOnClickOnMenu('signOut')}
        //       >
        //         Đăng xuất
        //       </Menu.Item>
        //     </Menu.Dropdown>
        //   </Menu>
        // </Flex>
        <LoggedHeader user={user} setUser={setUser} />
      ) : (
        <Flex gap='1rem' align='center' className='hidden-mobile'>
          {/* <LanguagePicker /> */}
          <Link href='/sign-up'>Sign-up</Link>
          <Link href='/sign-in'>Sign-in</Link>
        </Flex>
      )}
    </Flex>
  );
}
