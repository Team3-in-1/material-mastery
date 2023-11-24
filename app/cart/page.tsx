import { Title } from '@mantine/core';
import Cart from '@/components/Cart/cart';

const CartPage = () => {
  return (
    <>
      <Title order={2}>Giỏ hàng</Title>
      <Cart />
    </>
  );
};

export default CartPage;
