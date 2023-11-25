'use client';
import {
  Grid,
  Text,
  Checkbox,
  ActionIcon,
  Image,
  NumberInput,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import GachImg from '@/public/pic/gach.jpg';
import NextImage from 'next/image';
import { CartProduct } from '@/utils/response';
import { formatMoney } from '@/utils/string';
import { useEffect, useState } from 'react';

const CartItem = ({
  data,
  setTotalCost,
}: {
  data: CartProduct;
  setTotalCost: any;
}) => {
  const [quantity, setQuantity] = useState<string | number>(
    data.product_quantity
  );

  const mul = (n1: string | number, n2: string | number) => {
    const numericN1 = typeof n1 == 'string' ? parseFloat(n1) : n1;
    const numericN2 = typeof n2 == 'string' ? parseFloat(n2) : n2;
    return numericN1 * numericN2;
  };

  const cost = mul(data.product_price, quantity);

  useEffect(() => {
    setTotalCost(cost);
  }, [quantity]);

  return (
    <div className='bg-white rounded-lg py-3'>
      <Grid columns={10} py={5}>
        <Grid.Col span={1} className='flex items-center justify-center'>
          <Checkbox />
        </Grid.Col>
        <Grid.Col span={4} className='flex items-center gap-[1rem]'>
          <Image
            alt='product'
            component={NextImage}
            width={30}
            height={30}
            src={data.product_thumb || GachImg}
          />
          <Text className='text-[0.9rem]'>{data.product_name}</Text>
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <Text className='text-[0.8rem]'>
            {formatMoney(data.product_price)}
          </Text>
        </Grid.Col>
        <Grid.Col span={2} className='flex items-center'>
          <NumberInput
            min={1}
            defaultValue={1}
            max={100}
            value={quantity}
            allowNegative={false}
            onChange={setQuantity}
          />
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <Text className='text-[0.8rem]'>{formatMoney(cost)}</Text>
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <ActionIcon variant='filled' aria-label='Delete'>
            <IconTrash color='#000' stroke={1.5} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CartItem;
