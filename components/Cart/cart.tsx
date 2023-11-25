'use client';

import {
  Grid,
  Text,
  Checkbox,
  ActionIcon,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import CartItem from '../CartItem/cartItem';
import useCart from '@/helpers/useCart';
import queryClient from '@/helpers/client';
import { CartProduct } from '@/utils/response';
import cartService from '@/services/cartService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { formatMoney } from '@/utils/string';

const Cart = () => {
  const queryClient = useQueryClient();
  const [cart, setCart] = useCart(queryClient.getQueryData(['cart']));
  const [totalCost, setTotalCost] = useState(0);
  const addCost = (cost: number) => {
    setTotalCost(cost);
  };
  return (
    <Grid>
      <Grid.Col span={9}>
        <Grid columns={10} my={20} py={5} className='bg-white rounded-lg'>
          <Grid.Col span={1} className='flex items-center justify-center'>
            <Checkbox />
          </Grid.Col>
          <Grid.Col span={4} className='flex items-center'>
            <Text className='text-[0.8rem]'>Sản phẩm</Text>
          </Grid.Col>
          <Grid.Col span={1} className='flex items-center'>
            <Text className='text-[0.8rem]'>Đơn giá</Text>
          </Grid.Col>
          <Grid.Col span={2} className='flex items-center'>
            <Text className='text-[0.8rem]'>Số lượng</Text>
          </Grid.Col>
          <Grid.Col span={1} className='flex items-center'>
            <Text className='text-[0.8rem]'>Thành tiền</Text>
          </Grid.Col>
          <Grid.Col span={1} className='flex items-center'>
            <ActionIcon variant='filled' aria-label='Delete'>
              <IconTrash color='#000' stroke={1.5} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        {cart &&
          cart.cart_products.map((item: CartProduct) => (
            // product_name: string
            // product_thumb: string | null
            // product_description: string | null
            // product_price: number
            // product_quantity: number
            // product_brand: string | null
            // product_unit: string | null
            // product_ratingAverage: number | null
            // product_categories: string[] | null
            // productId: string | null
            <CartItem
              // product_name={item.product_name}
              // product_price={item.product_price}
              // product_quantity={item.product_quantity}
              // product_thumb={item.product_thumb}
              // product_brand={null}
              // productId={item.productId}
              // product_categories={null}
              // product_description={null}
              // product_ratingAverage={null}
              // product_unit={null}
              data={item}
              setTotalCost={addCost}
            />
          ))}
      </Grid.Col>
      <Grid.Col span={3}>
        <Container className='bg-white rounded' mt={20} py={20}>
          <Group pb={20} justify='space-between' align='flex-start'>
            <Text>Tạm tính</Text>
            <div className='text-[#02B1AB] text-right'>
              <p>
                {formatMoney(totalCost)}
                <span>đ</span>
              </p>
              <Text size='xs' c='dimmed'>
                (Chưa bao gồm phí vận chuyển)
              </Text>
            </div>
          </Group>
          <Button fullWidth className='bg-[#02B1AB]'>
            Mua hàng
          </Button>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default Cart;
