'use client';
import { useState } from 'react';
import { IconUser, IconChecklist, IconTicket } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface HandleRouterInterface {
  [id: number]: Function;
}

const AccountNav = ({ idPage }: { idPage: number }) => {
  const [active, setActive] = useState(idPage);
  const router = useRouter();
  const data = [
    {
      icon: IconUser,
      label: 'Thông tin tài khoản',
    },
    {
      icon: IconChecklist,
      label: 'Đơn hàng',
    },
    { icon: IconTicket, label: 'Kho vouvher' },
  ];
  const handleRouter: HandleRouterInterface = {
    0: () => {
      router.push('/account/details');
    },
    1: () => {
      router.push('/account/orders');
    },
    2: () => {
      router.push('/account/vouchers');
    },
  };
  const handleOnclick = (index: number) => {
    setActive(index);
    handleRouter[index]();
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size='1rem' stroke={1.5} />}
      className='h-[50px] rounded-[12px] mb-3'
      onClick={() => handleOnclick(index)}
    />
  ));

  return (
    <Box w={'100%'} h={'100%'} className=' p-[10px]'>
      {items}
    </Box>
  );
};

export default AccountNav;
