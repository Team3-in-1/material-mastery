'use client';
import { useState } from 'react';
import { IconUser, IconChecklist } from '@tabler/icons-react';
import { Box, NavLink, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// interface HandleRouterInterface {
//   [id: number]: Function;
// }

const AccountNav = ({ namePage }: { namePage: string }) => {
  const [active, setActive] = useState(namePage);
  // const router = useRouter();
  // const data = [
  //   {
  //     icon: IconUser,
  //     label: 'Thông tin tài khoản',
  //   },
  //   {
  //     icon: IconChecklist,
  //     label: 'Đơn hàng',
  //   },
  // ];
  // const handleRouter: HandleRouterInterface = {
  //   0: () => {
  //     router.push('/account/details');
  //   },
  //   1: () => {
  //     router.push('/account/orders');
  //   },
  // };
  // const handleOnclick = (index: number) => {
  //   setActive(index);
  //   handleRouter[index]();
  // };

  // const items = data.map((item, index) => (
  //   <NavLink
  //     key={item.label}
  //     active={index === active}
  //     label={item.label}
  //     leftSection={<item.icon size='1rem' stroke={1.5} />}
  //     className='h-[50px] rounded-[12px] mb-3'
  //     onClick={() => handleOnclick(index)}
  //   />
  // ));

  return (
    <Stack
      gap={0}
      className=' p-[10px] w-[200px] h-full bg-gray min-h-screen pt-[90px] justify-start bg-white rounded-md'
    >
      {/* {items} */}
      <NavLink
        active={active === 'details'}
        label='Thông tin tài khoản'
        leftSection={<IconUser size='1rem' stroke={1.5} />}
        className='h-[50px] rounded-[12px] mb-3 text-black'
        href={'/account/details'}
        style={active === 'details' ? { color: '#02B1AB' } : { color: '#000' }}
        component={Link}
      />
      <NavLink
        active={active === 'orders'}
        label='Đơn hàng'
        leftSection={<IconChecklist size='1rem' stroke={1.5} />}
        className='h-[50px] rounded-[12px] mb-3 text-black'
        style={active === 'orders' ? { color: '#02B1AB' } : { color: '#000' }}
        href={'/account/orders'}
        component={Link}
      />
    </Stack>
  );
};

export default AccountNav;
