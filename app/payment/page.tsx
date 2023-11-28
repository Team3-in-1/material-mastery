'use client';
import {
  Flex,
  Stack,
  Group,
  Text,
  Textarea,
  Divider,
  Button,
  Grid,
  Image,
  Radio,
  LoadingOverlay,
} from '@mantine/core';
import { IconMapPinFilled } from '@tabler/icons-react';
import NImage from 'next/image';
import exampleImage from '@/public/pic/gach.jpg';
import { CartProduct, User } from '@/utils/response';
import queryClient from '@/helpers/client';
import { formatMoney } from '@/utils/string';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLogin from '@/helpers/useLogin';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();
  const [user, setUser] = useLogin();
  if (!user) {
    setUser();
    router.replace('/');
  }
  console.log(typeof user);
  const userObject = typeof user == 'string' ? JSON.parse(user) : user;

  const [cost, setCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let cost = 0;
    products.map((product) => {
      cost += product.product_price * product.product_quantity;
    });
    setCost(cost);
  }, []);

  const products: CartProduct[] =
    queryClient.getQueryData(['productsChosen']) || [];

  const productsQuery = useQuery({
    queryKey: ['productsChosen'],
    queryFn: () => products,
  });

  return (
    // devide page into 2 col
    <Group
      gap={15}
      justify='center'
      align='start'
      className='relative z-[1] bg-[#f1f3f5] min-h-full w-full h-fit mt-[120px] mb-[30px] px-[100px] overflow-hidden'
    >
      {/*col 1*/}
      <Stack className='flex-[2]'>
        {/*recipient information*/}
        <Stack className='bg-white rounded-[10px] w-full px-[32px] py-[24px]'>
          <Group justify='space-between' className='w-full'>
            <Group>
              <IconMapPinFilled style={{ color: '#02B1AB' }} />
              <Text color='#02B1AB'>Thông tin nhận hàng</Text>
            </Group>
            <Text color='#02B1AB'>Thay đổi</Text>
          </Group>
          <Stack>
            <Group>
              <Text>{userObject.user.username}</Text>
              <Text>{userObject.user.phone}</Text>
            </Group>
            <Text>HCM</Text>
          </Stack>
        </Stack>

        {/*scheduled time*/}
        <Group className='gap-10 px-[32px] py-[24px] border-[#02B1AB] border-[1px] w-full'>
          <Text color='#02B1AB'>Dự kiến giao hàng:</Text>
          <Text color='#02B1AB'>04-10-2023</Text>
        </Group>

        {/*products*/}
        <Stack className='bg-white rounded-[10px] w-full px-[32px] py-[24px]'>
          <Text fw={700}>Sản phẩm</Text>
          <Grid>
            <Grid.Col
              style={{ display: 'flex', justifyContent: 'center' }}
              span={7}
            >
              <Text color='#252525'>Sản phẩm</Text>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Text color='#252525'>Đơn giá</Text>
            </Grid.Col>
            <Grid.Col
              span={1}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Text color='#252525'>SL</Text>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Text color='#252525'>Thành tiền</Text>
            </Grid.Col>
          </Grid>

          {products.map((product) => {
            return (
              <Grid key={product.productId}>
                <Grid.Col span={2}>
                  <Group justify='center' align='center'>
                    <Image
                      alt='img'
                      src={product.product_thumb || exampleImage}
                      component={NImage}
                      width={50}
                      height={50}
                      // className=' h-[106px] md:h-[106px]'
                    />
                  </Group>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Group
                    justify='flex-start'
                    align='center'
                    className='mt-[10px]'
                  >
                    <Text
                      color='#252525'
                      lineClamp={1}
                      className=' text-ellipsis text-sm'
                    >
                      {product.product_name}
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Group align='start' gap={0}>
                    <Text color='#252525'>
                      {formatMoney(product.product_price)}
                    </Text>
                    <Text color='#252525' size='10px'>
                      đ
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col
                  span={1}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text color='#252525'>{product.product_quantity}</Text>
                </Grid.Col>
                <Grid.Col
                  span={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Group align='start' gap={0}>
                    <Text color='#252525'>
                      {formatMoney(
                        product.product_price * product.product_quantity
                      )}
                    </Text>
                    <Text color='#252525' size='10px'>
                      đ
                    </Text>
                  </Group>
                </Grid.Col>
              </Grid>
            );
          })}
        </Stack>

        {/*promo*/}
        <Group
          className='bg-white rounded-[10px] w-full p-[30px]'
          justify='space-between'
        >
          <Text color='#252525'>Khuyến mãi</Text>
          <Text color='#02B1AB'>Chọn khuyến mãi</Text>
        </Group>

        {/*payment method*/}
        <Stack className='w-full rounded-[10px] py-[24px] px-[32px] bg-white'>
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
      </Stack>
      {/*col 2*/}
      <Stack className='flex-1'>
        <Stack className='px-[32px] py-[24px] bg-white rounded-[10px]'>
          <Group justify='space-between'>
            <Text fw={700}>Đơn hàng</Text>
            <Group gap={5}>
              <Text>{products.length}</Text>
              <Text>sản phẩm</Text>
            </Group>
          </Group>
          <Divider />
          <Group justify='space-between'>
            <Text>Tạm tính</Text>
            <Group gap={0} align='start'>
              <Text>{formatMoney(cost)}</Text>
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
              <Text color='#02B1AB' fw={600} size='30px'>
                00.00
              </Text>
              <Text color='#02B1AB' fw={600} size='15px'>
                đ{' '}
              </Text>
            </Group>
          </Group>
          <Button className=' w-full bg-0-primary-color-6 '>Thanh toán</Button>
        </Stack>
        <Stack className='bg-white p-8 rounded-[10px]'>
          <Text className='font-medium'>Ghi chú</Text>
          <Textarea placeholder='Ghi chú' />
        </Stack>
      </Stack>
      {/* {productsQuery.isPending && (
        <LoadingOverlay
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )} */}
    </Group>
  );
};

export default Payment;
