import { formatMoney } from '@/utils/string';
import { Group, Image, Stack, Text } from '@mantine/core';
import logo from '@/public/icon.svg';
import NextImage from 'next/image';

const Product = () => {
  return (
    <Group className=' items-center justify-between w-full'>
      <Group>
        <Image
          h={50}
          w='auto'
          component={NextImage}
          src={logo}
          alt='product image'
        />
        <Stack>
          <Text>Cuc gach xay mang ten Nokia</Text>
          <Text>x10</Text>
        </Stack>
      </Group>
      <Group className='gap-0'>
        <Text>{formatMoney(2000)}</Text>
        <Text>đ</Text>
      </Group>
    </Group>
  );
};

export default Product;
