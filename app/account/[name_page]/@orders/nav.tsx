'use client';
import '@/styles/global.css';
import { Button, Group, Text } from '@mantine/core';
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
          style={
            positionChecked == item.id
              ? {
                  flex: 1,
                  borderBottomWidth: 2,
                  borderTopWidth: 0,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  borderColor: '#02B1AB',
                  borderRadius: 0,
                }
              : { flex: 1 }
          }
          onClick={() => {
            setStart(1);
            setPage(1);
            setPositionChecked(item.id);
            setOrderStatus(item.id);
          }}
        >
          <Text
            fw={500}
            // color={positionChecked == item.id ? '#000' : '#808080'}
            style={
              positionChecked == item.id
                ? { color: '#000' }
                : { color: '#808080' }
            }
          >
            {item.label}
          </Text>
        </Button>
      ))}
    </Group>
  );
};

export default Nav;
