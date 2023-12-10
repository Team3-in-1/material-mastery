'use client';
import { Button, Group } from '@mantine/core';
import { useState } from 'react';

interface ItemInterface {
  id: number;
  label: string;
}

const Nav = () => {
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
    <Group className='w-full bg-white justify-between px-3 py-2 items-center rounded-[10px]'>
      {items.map((item) => (
        <Button
          key={item.id}
          className={
            positionChecked == item.id
              ? ' text-black border-b-2 border-0-primary-color-6 border-x-0 border-t-0 rounded-none font-medium'
              : ' text-[gray] font-medium'
          }
          onClick={() => {
            setPositionChecked(item.id);
          }}
        >
          {item.label}
        </Button>
      ))}
    </Group>
  );
};

export default Nav;