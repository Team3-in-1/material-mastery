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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const CartItem = ({
  data,
  setTotalCost,
  allChecked,
  setAllChecked,
  deleteItem,
  productChosen,
}: {
  data: CartProduct;
  setTotalCost: Function;
  allChecked: boolean;
  setAllChecked: Function;
  deleteItem: Function;
  productChosen: any;
}) => {
  const [quantity, setQuantity] = useState<string | number>(
    data.product_quantity
  );
  const [isChecked, setIsChecked] = useState(allChecked);

  const mul = (n1: string | number, n2: string | number) => {
    const numericN1 = typeof n1 == 'string' ? parseFloat(n1) : n1;
    const numericN2 = typeof n2 == 'string' ? parseFloat(n2) : n2;
    return numericN1 * numericN2;
  };

  const add = (n1: string | number, n2: string | number) => {
    const numericN1 = typeof n1 == 'string' ? parseFloat(n1) : n1;
    const numericN2 = typeof n2 == 'string' ? parseFloat(n2) : n2;
    return numericN1 + numericN2;
  };

  useLayoutEffect(() => {
    setIsChecked(allChecked);
    if (allChecked) {
      setTotalCost(mul(quantity, data.product_price));
    } else {
      setTotalCost(-1);
    }
  }, [allChecked]);

  return (
    <div className='bg-white  py-3'>
      <Grid columns={10} py={5}>
        <Grid.Col span={1} className='flex items-center justify-center'>
          <Checkbox
            checked={isChecked || allChecked}
            onChange={(event) => {
              if (!event.currentTarget.checked && allChecked) {
                setAllChecked(false);
              }
              if (!event.currentTarget.checked) {
                setTotalCost(-quantity * data.product_price);
                setIsChecked(false);
              } else {
                setTotalCost(mul(quantity, data.product_price));
                setIsChecked(true);
              }
              setIsChecked(event.currentTarget.checked);
            }}
          />
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
            onChange={(value) => {
              if (isChecked)
                value < quantity
                  ? setTotalCost(-data.product_price * add(quantity, -value))
                  : setTotalCost(data.product_price * add(-quantity, value));
              setQuantity(value);
            }}
          />
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <Text className='text-[0.8rem]'>
            {formatMoney(mul(data.product_price, quantity))}
          </Text>
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <ActionIcon
            variant='filled'
            aria-label='Delete'
            onClick={() => {
              deleteItem(data.productId);
            }}
          >
            <IconTrash color='#000' stroke={1.5} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default CartItem;
