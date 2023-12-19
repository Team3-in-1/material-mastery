'use client';
import '@/styles/global.css';
import { Button, Group } from '@mantine/core';
import { useState } from 'react';

interface ItemInterface {
  id: number;
  label: string;
}

const Nav = ({
  orderStatus,
  setOrderStatus,
  setStart,
  setPage,
}: {
  orderStatus: any;
  setOrderStatus: any;
  setStart: any;
  setPage: any;
}) => {
  const [positionChecked, setPositionChecked] = useState(0);
  const items: ItemInterface[] = [
    { id: 0, label: 'Tất cả' },
    { id: 1, label: 'Chờ xác nhận' },
    { id: 2, label: 'Đang xử lý' },
    { id: 3, label: 'Vận chuyển' },
    { id: 4, label: 'Hoàn thành' },
    { id: 5, label: 'Đã hủy' },
  ];
  return (
    <Group
      justify='between'
      px={12}
      py={8}
      align='center'
      w={'100%'}
      bg={'white'}
      className='rounded-[10px]'
    >
      {items.map((item) => (
        <Button
          key={item.label}
          bg={'transparent'}
          className={
            positionChecked == item.id
              ? 'flex-1 text-black border-b-2 border-0-primary-color-6 border-x-0 border-t-0 rounded-none font-medium'
              : 'flex-1 text-[gray] font-medium'
          }
          onClick={() => {
            setStart(1);
            setPage(1);
            setPositionChecked(item.id);
            setOrderStatus(item.id);
          }}
        >
          {item.label}
        </Button>
      ))}
    </Group>
  );
};

export default Nav;
