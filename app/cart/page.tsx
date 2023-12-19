import '@/styles/global.css';
import { Title } from '@mantine/core';
import Cart from '@/components/Cart/cart';

const CartPage = () => {
  return (
    <div>
      <Title order={2}>Giỏ hàng</Title>
      <Cart />
    </div>
  );
};

export default CartPage;
