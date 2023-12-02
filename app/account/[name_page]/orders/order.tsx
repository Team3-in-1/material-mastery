import { formatMoney } from '@/utils/string';
import { Stack, Group, Text, Divider } from '@mantine/core';
import Product from './product';

const Order = () => {
  return (
    <Stack className='bg-white p-[20px] rounded-[10px]'>
      {/* infor of order */}
      <Group className='w-full justify-between'>
        <Group>
          <Text>Mã đơn hàng</Text>
          <Text>1283289371298</Text>
        </Group>
        <Group>
          <Text>Chưa thanh toán</Text>
          <Divider orientation='vertical' />
          <Text>Chưa xác nhận</Text>
        </Group>
      </Group>
      <Divider />

      {/* list products */}
      <Stack>
        <Product />
      </Stack>
      <Divider />

      {/* cost of order */}
      <Group className=' w-full flex-row-reverse'>
        <Group>
          <Text>Thành tiền</Text>
          <Group className=' gap-0'>
            <Text>{formatMoney(200000)}</Text>
            <Text>đ</Text>
          </Group>
        </Group>
      </Group>
    </Stack>
  );
};

export default Order;
