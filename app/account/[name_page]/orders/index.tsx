import { Stack } from '@mantine/core';
import Nav from './nav';
import Order from './order';

const OrdersPage = () => {
  return (
    <Stack className='mx-[100px]'>
      <Nav />
      <Order />
    </Stack>
  );
};

export default OrdersPage;
