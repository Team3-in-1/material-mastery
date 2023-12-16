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
import { useContext, useEffect, useRef, useState } from 'react';
import queryClient from '@/helpers/client';
import LoggedHeader from './loggedHeader';
import UserContext from '@/contexts/UserContext';

// interface OnClickInterface {
//   [index: string]: Function;
// }

export default function Header() {
  const appName = 'Material Mastery';

  const { user, setUser } = useContext(UserContext);
  if (!user) return <></>;

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
      <Link
        href={
          user?.userId && user?.roles[0] == 'manager'
            ? '/staff/dashboard/revenue'
            : '/'
        }
      >
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
      {user.userId && user?.roles[0] != 'manager' && <Search content='' />}

      {user?.userId ? (
        <LoggedHeader user={user} setUser={setUser} />
      ) : (
        <Flex gap='1rem' align='center' className='hidden-mobile'>
          {/* <LanguagePicker /> */}
          <Link
            href='/sign-up'
            onClick={() => {
              queryClient.clear();
            }}
          >
            Sign-up
          </Link>
          <Link
            href='/sign-in'
            onClick={() => {
              queryClient.clear();
            }}
          >
            Sign-in
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
