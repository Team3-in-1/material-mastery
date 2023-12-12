import { formatMoney } from '@/utils/string';
import { Stack, Group, Text, Divider } from '@mantine/core';
import Product from './product';

const Order = () => {
  return (
    <Stack className='bg-white p-[20px] rounded-[10px]'>
      {/* infor of order */}
      <Group className='w-full justify-between'>
        <Group>
          <Text className='  text-[#8E8E8E]'>Mã đơn hàng</Text>
          <Text className='text-[#8E8E8E]'>1283289371298</Text>
        </Group>
        <Group>
          <Text className=' font-light text-[#0063FF]'>Chưa thanh toán</Text>
          <Divider orientation='vertical' />
          <Text className=' font-light text-[#FFA903]'>Chưa xác nhận</Text>
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
          <Group className=' gap-0 text-[#02B1AB]'>
            <Text>{formatMoney(200000)}</Text>
            <Text>đ</Text>
          </Group>
        </Group>
      </Group>
    </Stack>
  );
};

export default Order;
