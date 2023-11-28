'use client';

import {
  Grid,
  Text,
  Checkbox,
  ActionIcon,
  Container,
  Group,
  Button,
  Notification,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import CartItem from '../CartItem/cartItem';
import useCart from '@/helpers/useCart';
import queryClient from '@/helpers/client';
import { CartProduct } from '@/utils/response';

import cartService from '@/services/cartService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { formatMoney } from '@/utils/string';
import useRQGlobalState from '@/helpers/useRQGlobalState';
import { useRouter } from 'next/navigation';
import { data } from 'cypress/types/jquery';

const Cart = () => {
  const [cart, setCart] = useCart();
  const [totalCost, setTotalCost] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const productsChosen = useRef<CartProduct[]>([]);
  const router = useRouter();
  const [products, setProducts] = useRQGlobalState(
    'productsChosen',
    productsChosen
  );
  const [numberChecked, setNumberChecked] = useState(-1);

  useEffect(() => {
    if (cart) {
      if (
        numberChecked != -1 &&
        numberChecked == cart.cart_products.length - 1
      ) {
        setAllChecked(true);
        if (totalCost != 0 && !allChecked) setTotalCost(0);
      }
    }
  }, [numberChecked]);

  const addCost = (cost: number) => {
    if (cost == -1) setTotalCost(0);
    else setTotalCost((prev) => prev + cost);
  };

  const deleteOneProduct = (id: string) => {
    const data = structuredClone(cart);

    for (let i = 0; i < data.cart_products.length; i++) {
      console.log(
        'data.cart_products.productId',
        data.cart_products[i].productId
      );
      console.log('id', id);
      if (data.cart_products[i].productId == id) {
        console.log('delete product');
        data.cart_products.splice(i, 1);
        break;
      }
    }

    setCart(data);
  };

  return (
    <Grid>
      <Grid.Col span={9}>
        <Grid columns={10} my={20} py={5} className='bg-white rounded-lg'>
          <Grid.Col span={1} className='flex items-center justify-center'>
            <Checkbox
              checked={allChecked}
              onChange={(event) => {
                if (cart && cart.cart_products) {
                  if (event.currentTarget.checked) {
                    while (productsChosen.current.length)
                      productsChosen.current.pop();
                    productsChosen.current.push(...cart.cart_products);
                    setNumberChecked(cart.cart_products.length - 1);
                  } else {
                    while (productsChosen.current.length)
                      productsChosen.current.pop();
                    setNumberChecked(-1);
                  }
                }
                setTotalCost(0);
                setAllChecked(event.currentTarget.checked);
              }}
            />
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
            <ActionIcon
              variant='filled'
              aria-label='Delete'
              onClick={() => {
                setCart();
                setTotalCost(0);
              }}
            >
              <IconTrash color='#000' stroke={1.5} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
        <div className='bg-white rounded-[10px] py-[10px]'>
          {cart &&
            cart.cart_products.map((item: CartProduct) => (
              <CartItem
                key={item.productId}
                data={item}
                setTotalCost={addCost}
                allChecked={allChecked}
                setAllChecked={setAllChecked}
                deleteItem={deleteOneProduct}
                productChosen={productsChosen}
                setNumberChecked={setNumberChecked}
              />
            ))}
        </div>
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
          <Button
            fullWidth
            className='bg-[#02B1AB]'
            onClick={() => {
              if (productsChosen.current.length != 0) {
                setProducts(productsChosen.current);
                router.push('/payment');
              } else {
              }
            }}
          >
            Mua hàng
          </Button>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default Cart;
