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

export const PCard = ({ data }: PCardProps) => {
  const [value, setValue] = useState(2);
  return (
    <Card
      className={`${Styles.containerCard}`}
      style={{
        position: 'relative',
        border: '1px solid #E2E2E2',
        borderRadius: '5px',
      }}
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
          {data.product_name.length <= 35 ? (
            <Text className='my-2 text-[1rem] text-ellipsis gap-0 tracking-tighter'>
              {data.product_name}
            </Text>
          ) : (
            <Text className='my-2 text-[0.7rem] text-ellipsis'>
              {data.product_name}
            </Text>
          )}
        </div>

        <Group justify='space-between' className=' justify-between'>
          <Group
            gap={0}
            align='start'
            justify='flex-start'
            className=' items-start'
          >
            <Text className='text-[1rem]'>{data.product_price}</Text>
            <Text size='12px' className=' text-[12px]'>
              đ
            </Text>
          </Group>

          <ActionIcon color='#E9F9F8' variant='filled' aria-label='Add'>
            <IconShoppingCartPlus color='#02B1AB' />
          </ActionIcon>
        </Group>
        <Group justify='space-between' className='justify-between mt-2'>
          <Rating value={value} readOnly onChange={setValue} />
          <Group>
            <Divider size='sm' orientation='vertical' />
            <Text c='dimmed'>{data.product_quantity}</Text>
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
