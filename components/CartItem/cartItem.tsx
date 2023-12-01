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
import { string } from 'zod';
import { is } from 'cypress/types/bluebird';

const CartItem = ({
  data,
  setTotalCost,
  allChecked,
  setAllChecked,
  deleteItem,
  productChosen,
  setNumberChecked,
}: {
  data: CartProduct;
  setTotalCost: Function;
  allChecked: boolean;
  setAllChecked: Function;
  deleteItem: Function;
  productChosen: any;
  setNumberChecked: Function;
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

  const onChecked = (checked: boolean) => {
    if (!checked && allChecked) {
      while (productChosen.current.length) productChosen.current.pop();
      setAllChecked(false);
      setNumberChecked(-1);
    } else {
      if (!checked) {
        setNumberChecked((prev: number) => --prev);
        setTotalCost(-quantity * data.product_price);
        setIsChecked(false);

        for (let i = 0; i < productChosen.current.length; i++) {
          console.log(
            'productChosen.current.productId',
            productChosen.current[i].productId
          );
          console.log('id', data.productId);
          if (productChosen.current[i].productId == data.productId) {
            console.log('delete product');
            productChosen.current.splice(i, 1);
            break;
          }
        }
      } else {
        setNumberChecked((prev: number) => ++prev);
        setTotalCost(mul(quantity, data.product_price));
        setIsChecked(true);

        const cloneProduct = structuredClone(data);
        cloneProduct.product_quantity =
          typeof quantity == 'string' ? parseFloat(quantity) : quantity;
        productChosen.current.push(cloneProduct);
      }
    }
    setIsChecked(checked);
  };

  return (
    <div className='bg-white  py-3'>
      <Grid columns={10} py={5}>
        <Grid.Col
          span={1}
          className='flex items-center justify-center cursor-pointer'
          onClick={() => {
            onChecked(!isChecked);
          }}
        >
          <Checkbox
            checked={isChecked || allChecked}
            onChange={(event) => {
              onChecked(event.currentTarget.checked);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4} className='flex items-center gap-[1rem] '>
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
              if (isChecked) {
                setTotalCost(-mul(quantity, data.product_price));
              }
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
