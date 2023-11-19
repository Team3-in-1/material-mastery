'use client'
import { Flex, Stack, Group, Text, Textarea, Divider, Button, Grid, Image, Radio } from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import '@mantine/core/styles.css'
import NImage from 'next/image';
import exampleImage from '@/public/pic/gach.jpg';

interface UserInfor {
  username: string;
  phone: string;
  address: string;
}

interface ProductData {
  product_name: string;
  product_url: string;
  product_price: number;
  product_quantity: number;
  product_amount: number;
}


const Payment = () => {
  const userInfo: UserInfor = {
    username: 'Robot',
    phone: '012993921',
    address:
      'Kí Túc Xá Khu B - Đhqg, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
  };

  const number = 0;

  const products: ProductData[] = [
    {
      product_name: 'Brick',
      product_price: 20000,
      product_url: 'example.com',
      product_quantity: 20,
      product_amount: 400000,

    },
    {
      product_name: 'Brick',
      product_price: 20000,
      product_url: 'example.com',
      product_quantity: 20,
      product_amount: 400000,

    },
    {
      product_name: 'Brick',
      product_price: 20000,
      product_url: 'example.com',
      product_quantity: 20,
      product_amount: 400000,

    },
  ]
  return (
    // devide page into 2 col
    <Group gap={0} justify='center' align='start' className='relative z-[1] bg-[#f1f3f5] min-h-full w-full h-fit mt-[120px] mb-[30px] px-[100px] overflow-hidden' >
      {/*col 1*/}
      < Stack className='flex-[2] w-[760px] h-full' >

        {/*recipient information*/}
        < Stack className='bg-white rounded-[10px] w-[760px] px-[32px] py-[24px]' >
          <Group justify='space-between' className='w-full mt-[10px]'>
            <Group>
              <IconMapPinFilled color='red' />
              <Text color='#02B1AB'>Thông tin nhận hàng</Text>
            </Group>
            <Text color='#02B1AB'>
              Thay đổi
            </Text>
          </Group>
          <Stack>
            <Group>
              <Text>{userInfo.username}</Text>
              <Text>{userInfo.phone}</Text>
            </Group>
            <Text>{userInfo.address}</Text>
          </Stack>
        </Stack >


        {/*scheduled time*/}
        < Group className='gap-10 px-[32px] py-[24px] border-[#02B1AB] border-[1px] w-[760px]'>
          <Text color='#02B1AB'>Dự kiến giao hàng:</Text>
          <Text color='#02B1AB'>04-10-2023</Text>
        </Group >


        {/*products*/}
        < Stack className='bg-white rounded-[10px] w-[760px] px-[32px] py-[24px]' >
          <Text fw={700}>Sản phẩm</Text>
          <Grid>
            <Grid.Col style={{ display: 'flex', justifyContent: 'center' }} span={6} >
              <Text color='#252525'>Sản phẩm</Text>
            </Grid.Col>
            <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Text color='#252525'>Đơn giá</Text>
            </Grid.Col>
            <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Text color='#252525'>Số lượng</Text>
            </Grid.Col>
            <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Text color='#252525'>Thành tiền</Text>
            </Grid.Col>
          </Grid>

          {
            products.map(product => (
              <Grid>
                <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Group>
                    <Image
                      alt='img'
                      src={exampleImage}
                      component={NImage}
                      className=' h-[106px] md:h-[106px]'
                    />
                    <Text color='#252525'>{product.product_name}</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Group align='start' gap={0}>
                    <Text color='#252525'>{product.product_price}</Text>
                    <Text color='#252525' size='10px'>đ</Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text color='#252525'>{product.product_quantity}</Text>
                </Grid.Col>
                <Grid.Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Group align='start' gap={0}>
                    <Text color='#252525'>{product.product_amount}</Text>
                    <Text color='#252525' size='10px'>đ</Text>
                  </Group>
                </Grid.Col>
              </Grid>
            ))
          }
        </Stack >

        {/*promo*/}
        <Group className='bg-white rounded-[10px] w-[760px] p-[30px]' justify='space-between'>
          <Text color='#252525'>Khuyến mãi</Text>
          <Text color='#02B1AB'>Chọn khuyến mãi</Text>
        </Group >

        {/*payment method*/}
        <Stack className='w-[760px] rounded-[10px] py-[24px] px-[32px] bg-white'>
          <Text fw={700}>Phương thức thanh toán</Text>
          <Radio.Group>
            <Stack>
              <Radio label='Thanh toán khi nhận hàng' value='1' />
              <Radio label='Thanh toán khi nhận hàng' value='2' />
              <Radio label='Thanh toán khi nhận hàng' value='3' />
              <Radio label='Thanh toán khi nhận hàng' value='4' />
            </Stack>
          </Radio.Group>
        </Stack>
      </Stack >





      {/*col 2*/}
      < Stack className='flex-1 h-full' >
        <Stack className='px-[32px] py-[24px] bg-white rounded-[10px]'>
          <Group justify='space-between'>
            <Text fw={700}>Đơn hàng</Text>
            <Group gap={5}>
              <Text>{number}</Text>
              <Text>sản phẩm</Text>
            </Group>
          </Group>
          <Divider />
          <Group justify='space-between'>
            <Text>Tạm tính</Text>
            <Group gap={0} align='start'>
              <Text >00.00</Text>
              <Text size='10px'>đ</Text>
            </Group>
          </Group>
          <Group justify='space-between'>
            <Text>Phí vận chuyển</Text>
            <Group gap={0} align='start'>
              <Text>00.00</Text>
              <Text size='10px'>đ</Text>
            </Group>
          </Group>
          <Group justify='space-between'>
            <Text>Khuyến mãi</Text>
            <Group gap={0} align='start'>
              <Text>00.00</Text>
              <Text size='10px'>đ</Text>
            </Group>
          </Group>
          <Divider />
          <Group justify='space-between'>
            <Text>Tổng tiền</Text>
            <Group gap={0} align='start'>
              <Text color='#02B1AB' fw={600} size='30px'>00.00</Text>
              <Text color='#02B1AB' fw={600} size='15px'>đ </Text>
            </Group>
          </Group>
          <Button>Thanh toán</Button>
        </Stack>
        <Stack className='bg-white p-8 rounded-[10px]'>
          <Text className='font-medium' >Ghi chú</Text>
          <Textarea placeholder='Ghi chú' />
        </Stack>
      </Stack >

    </Group >
  );
};

export default Payment;
