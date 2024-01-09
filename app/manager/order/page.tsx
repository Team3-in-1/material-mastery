'use client';
import CalendarInput from '@/components/CalendarInput/calendarInput';
import { chunk } from '@/utils/array';
import {
  ComboboxProps,
  Fieldset,
  Group,
  Pagination,
  ScrollArea,
  Select,
  Stack,
  Table,
  Checkbox,
  Text,
  LoadingOverlay,
  Button,
  Skeleton,
  Loader,
} from '@mantine/core';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { useQuery } from '@tanstack/react-query';
import OrderService from '@/services/orderService';
import TableSkeleton from '@/components/Skeleton/tableSkeleton';
import OrderTable from './orderTable';

const dates = ['Ngày', 'Tuần', 'Tháng', 'Quý', 'Năm'];
const dateMapping = {
  Ngày: 'day',
  Tuần: 'week',
  Tháng: 'month',
  Quý: 'quarter',
  Năm: 'year',
};

const paymentState = ['Tất cả', 'Đã thanh toán', 'Chưa thanh toán'];
const shipmentState = [
  'Tất cả',
  'Chờ xác nhận',
  'Chuẩn bị hàng',
  'Đã hủy',
  'Đang giao',
  'Đã giao',
  'Giao thất bại',
  'Giao thành công',
];
const filterMapping = {
  'Tất cả': '',
  'Chờ xác nhận': 'pending',
  'Chuẩn bị hàng': 'confirmed',
  'Đang giao': 'shipping',
  'Đã giao': 'shipped',
  'Đã hủy': 'cancelled',
  'Giao thất bại': 'failed',
  'Giao thành công': 'delivered',
  'Chưa thanh toán': 'pending',
  'Đã thanh toán': 'paid',
};

const comboboxStyles: ComboboxProps = {
  transitionProps: { transition: 'pop', duration: 200 },
  shadow: 'md',
};
export default function OnlineOrderSegment() {
  const [activePage, setPage] = useState(1);
  // filter
  const [date, setDate] = useState<string | null>(dates[0]);
  const [filter, setFilter] = useState<string>('Tất cả');
  const { user } = useContext(UserContext);
  const orders = useQuery({
    queryKey: [
      'orders',
      activePage,
      filterMapping[filter as keyof typeof filterMapping],
    ],
    queryFn: () => {
      const orderService = new OrderService(user);
      return orderService.getAllOrder(
        10,
        activePage,
        filterMapping[filter as keyof typeof filterMapping]
      );
    },
    enabled: !!user,
  });

  const numberOfOrder = useQuery({
    queryKey: ['numberOfOrder'],
    queryFn: () => {
      const orderService = new OrderService(user);
      return orderService.getNumberOfOrder();
    },
    enabled: !!user,
  });

  const calPages = (num: any) => {
    switch (filter) {
      case shipmentState[0]:
        return Math.ceil(
          (num.pending +
            num.confirmed +
            num.cancelled +
            num.shipping +
            num.shipped +
            num.failed) /
            10
        );
      case shipmentState[1]:
        return Math.ceil(num.pending / 10);
      case shipmentState[2]:
        return Math.ceil(num.confirmed / 10);
      case shipmentState[3]:
        return Math.ceil(num.cancelled / 10);
      case shipmentState[4]:
        return Math.ceil(num.shipping / 10);
      case shipmentState[5]:
        return Math.ceil(num.shipped / 10);
      case shipmentState[6]:
        return Math.ceil(num.failed / 10);
      case shipmentState[7]:
        return Math.ceil(num.pending / 10);
      case shipmentState[8]:
        return Math.ceil(num.paid / 10);
      default:
        break;
    }
  };

  return (
    <ScrollArea className='h-full w-full z-[0]' py='1rem' px='2rem'>
      <Stack className='flex flex-col gap-[16px]'>
        <Fieldset className='flex gap-[16px] items-end w-fit' legend='Bộ lọc'>
          {/* <Group gap='0.5rem'>
                        <Select
                            w='100'
                            data={dates}
                            value={date}
                            onChange={setDate}
                            rightSectionWidth={0}
                            comboboxProps={comboboxStyles}
                        />
                        <CalendarInput type={dateMapping[date as keyof typeof dateMapping]} />
                    </Group> */}
          <Select
            w='fit-content'
            label='Trạng thái thanh toán'
            data={paymentState}
            value={filter}
            onChange={(value) => setFilter(value as string)}
            comboboxProps={comboboxStyles}
          />
          <Select
            w='fit-content'
            label='Trạng thái giao hàng'
            data={shipmentState}
            value={filter}
            onChange={(value) => setFilter(value as string)}
            comboboxProps={comboboxStyles}
          />
        </Fieldset>
        {orders.isPending || numberOfOrder.isPending ? (
          <div className='w-full h-[500px] flex justify-center items-center'>
            <Loader type='dots' />
          </div>
        ) : (
          <div className='flex flex-col border-[0.5px] border-solid rounded-[4px] w-full py-[12px] px-[16px]'>
            <OrderTable orders={orders.data} />
            <Pagination
              className='self-center'
              classNames={{
                control: 'pagination-control',
              }}
              total={calPages(numberOfOrder.data) as number}
              value={activePage}
              onChange={setPage}
              mt='sm'
            />
          </div>
        )}
      </Stack>
    </ScrollArea>
  );
}
