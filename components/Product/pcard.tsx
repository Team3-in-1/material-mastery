'use client';
import {
  Card,
  Image,
  Group,
  Text,
  Flex,
  ActionIcon,
  Divider,
  Rating,
  Badge,
} from '@mantine/core';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import { useState } from 'react';
import Styles from './pcard.module.css';
import Link from 'next/link';
import { Product } from '@/utils/response';
import useRQGlobalState from '@/helpers/useRQGlobalState';
import { formatMoney } from '@/utils/string';
import { useMutation } from '@tanstack/react-query';
import useCart from '@/helpers/useCart';
import '../../app/global.css';
import CartService from '@/services/cartService';
import queryClient from '@/helpers/client';
import toast, { Toaster } from 'react-hot-toast';

export const PCard = ({ data }: PCardProps) => {
  const [value, setValue] = useState(2);
  const [cart, setCart] = useCart();
  const addMutation = useMutation({
    mutationKey: ['addProductCart'],
    mutationFn: (productId: string) => {
      const cartServices = new CartService(queryClient.getQueryData(['user']));
      console.log('productId', productId);
      return cartServices.addProduct(productId, 1);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const productQuantity =
    data.product_quantity < 1000
      ? data.product_quantity
      : Math.floor(data.product_quantity / 1000) + 'K';

  return (
    <Card
      className={`${Styles.containerCard}`}
      pos='relative'
      radius='4'
      withBorder
    >
      <Card.Section component={Link} href={`/products/${data._id}`}>
        <Image
          alt='product'
          // height={9}
          h={147}
          w={200}
          src={data.product_thumb}
        />
      </Card.Section>
      <Flex
        justify={'space-around'}
        direction={'column'}
        h={'100%'}
        w={'100%'}
        className='h-[100px] justify-around w-[100%] flex-col'
      >
        <Divider />
        <div className='h-[60px]'>
          <Text
            className='my-2 text-[0.875rem] text-ellipsis gap-0 tracking-tighter'
            lineClamp={2}
          >
            {data.product_name}
          </Text>
        </div>

        <Group justify='space-between' className=' justify-between'>
          <Group
            gap={0}
            align='start'
            justify='flex-start'
            className=' items-start'
          >
            <Text className='text-[1rem]'>
              {formatMoney(data.product_price)}
            </Text>
            <Text size='12px' className=' text-[12px]'>
              đ
            </Text>
          </Group>

          <ActionIcon
            color='#E9F9F8'
            variant='filled'
            aria-label='Add'
            onClick={() => {
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
              if (cart) {
                const newCart = structuredClone(cart);
                if (newCart.cart_products == 0) {
                  newCart.cart_products.push({
                    product_name: data.product_name,
                    product_thumb: data.product_thumb,
                    product_description: null,
                    product_price: data.product_price,
                    product_quantity: 1,
                    product_brand: null,
                    product_unit: null,
                    product_ratingAverage: null,
                    product_categories: null,
                    productId: data._id,
                  });
                } else {
                  let temp = 0;
                  newCart.cart_products.every(
                    (value: any, index: any, array: any) => {
                      if (value.productId == data._id && temp == 0) {
                        value.product_quantity++;
                        temp = 1;
                        return false;
                      }
                      return true;
                    }
                  );
                  if (temp == 0) {
                    newCart.cart_products.push({
                      product_name: data.product_name,
                      product_thumb: data.product_thumb,
                      product_description: null,
                      product_price: data.product_price,
                      product_quantity: 1,
                      product_brand: null,
                      product_unit: null,
                      product_ratingAverage: null,
                      product_categories: null,
                      productId: data._id,
                    });
                  }
                }
                addMutation.mutate(data._id);
                setCart(newCart);
                toast.success('Thêm sản phẩm thành công');
              } else {
              }
            }}
          >
            <IconShoppingCartPlus color='#02B1AB' />
          </ActionIcon>
        </Group>
        <Group justify='space-between' wrap='nowrap'>
          <Rating value={value} readOnly onChange={setValue} />
          <Group wrap='nowrap'>
            <Divider size='xs' orientation='vertical' />
            <Text c='dimmed'>{productQuantity}</Text>
          </Group>
        </Group>
      </Flex>
      <Badge
        className='absolute top-3 right-1 text-sx font-light'
        color='#F76D6D'
      >
        -99 %
      </Badge>
    </Card>
  );
};

interface PCardProps {
  data: Product;
}
