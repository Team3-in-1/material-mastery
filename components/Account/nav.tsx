'use client';
import { useState } from 'react';
import { IconUser, IconChecklist, IconTicket } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';

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

const AccountNav = () => {
  const [active, setActive] = useState(0);
  const handleOnclick = (index: number) => {
    setActive(index);
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size='1rem' stroke={1.5} />}
      onClick={() => handleOnclick(index)}
    />
  ));

  return (
    <Box w={'100%'} bg={'white'} mt={90}>
      {items}
    </Box>
  );
};

export default AccountNav;
