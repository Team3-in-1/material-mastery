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
import { CardInterface } from '@/helpers/useCard';

const CartItem = (data: CardInterface) => {
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
            w='6rem'
            h='6rem'
            src={GachImg}
          />
          <Text className='text-[0.9rem]'>{data.id}</Text>
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <Text className='text-[0.8rem]'>{data.price}</Text>
        </Grid.Col>
        <Grid.Col span={2} className='flex items-center'>
          <NumberInput min={1} defaultValue={1} value={data.quantity} />
        </Grid.Col>
        <Grid.Col span={1} className='flex items-center'>
          <Text className='text-[0.8rem]'>{data.price * data.quantity}</Text>
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