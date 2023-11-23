'use client';
import NextImage from 'next/image';
import { Flex, Group, Image, Text, Anchor, Menu, rem } from '@mantine/core';
import logo from '@/public/icon.svg';
import Search from '../Search/search';
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

import { useLocalStorage } from '@mantine/hooks';
import useLogin from '@/helpers/useLogin';
import useRQGlobalState from '@/helpers/useRQGlobalState';
import useCard from '@/helpers/useCard';

export default function Header() {
  const appName = 'Material Mastery';
  const [user, setUser] = useLogin();
  const [card, setCard] = useCard();
  const router = useRouter();

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
      <Anchor href='/' underline='never'>
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
      </Anchor>
      <Search content='' />

      {user ? (
        <Flex gap='1rem' align='center' className='hidden-mobile'>
          {/* <LanguagePicker /> */}
          <div className=' relative w-[25px] h-[25px]'>
            <IconShoppingCart
              onClick={() => router.push('/cart')}
              className={classes.hoverIcon}
            />
            {card.length != 0 && (
              <Text className=' absolute top-[-10px] right-[-10px] text-red-500 font-bold'>
                {card.length}
              </Text>
            )}
          </div>
          <Menu trigger='hover' openDelay={100} closeDelay={400} zIndex={1002}>
            <Menu.Target>
              <IconUserCircle className={classes.hoverIcon} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {}}
              >
                Thông tin tài khoản
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconChecklist style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {}}
              >
                Đơn hàng
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTicket style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {}}
              >
                Kho voucher
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {
                  setUser();
                }}
              >
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      ) : (
        <Flex gap='1rem' align='center' className='hidden-mobile'>
          <LanguagePicker />
          <Link href='/sign-up'>Sign-up</Link>
          <Link href='/sign-in'>Sign-in</Link>
        </Flex>
      )}
    </Flex>
  );
}
