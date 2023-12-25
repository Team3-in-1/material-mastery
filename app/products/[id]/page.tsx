'use client';
import '@/styles/global.css';

import UserContext from '@/contexts/UserContext';
import OrderService from '@/services/orderService';
import NextImage from 'next/image';
import {
  Stack,
  Group,
  ActionIcon,
  Text,
  Button,
  LoadingOverlay,
  Grid,
  Divider,
  Textarea,
  Image,
  Rating,
} from '@mantine/core';
import { IconArrowNarrowLeft, IconMapPinFilled } from '@tabler/icons-react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { formatMoney } from '@/utils/string';
import queryClient from '@/helpers/client';
import { productService } from '@/services/productService';
import StepperOrder from './stepper';
import CommentService from '@/services/commentService';
import toast from 'react-hot-toast';
import RatingProduct from './rating';

interface Product {
  _id: string;
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_brand: string;
  product_unit: string;
  product_ratingAverage: number;
  product_categories: ProductCategory[];
  createdAt: string;
  updatedAt: string;
  product_slug: string;
  __v: number;
}

interface ProductCategory {
  _id: string;
  category_name: string;
}
const items = [
  { id: 0, label: 'Chờ xác nhận' },
  { id: 1, label: 'Đang xử lý' },
  { id: 2, label: 'Vận chuyển' },
  { id: 3, label: 'Hoàn thành' },
];
const DetailProductPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  // const [content, setContent] = useState('');
  // const [rating, setRating] = useState(5);
  const detail = useQuery({
    queryKey: ['orderDetail', params.id],
    queryFn: () => {
      console.log('user', user);
      const orderService = new OrderService(user);
      return orderService.getOrderById(params.id);
    },
    staleTime: Infinity,
    enabled: !!user,
  });

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (!detail.isPending && detail.data) {
      console.log(detail.data.order_products[0].item_products);
      detail.data.order_products.map(async (product: any) => {
        await (async () => {
          const data = await queryClient.ensureQueryData({
            queryKey: ['productData', product.item_products[0].productId],
            queryFn: () => {
              return productService.getProductById(
                product.item_products[0].productId
              );
            },
            staleTime: Infinity,
          });
          setProducts((preData: any) => [...preData, data]);
          console.log('products.length', data);
        })();
      });
    }
  }, [detail.isPending]);

  const confirmOderMutation = useMutation({
    mutationKey: ['cofirm order', params.id],
    mutationFn: (orderId: string) => {
      const orderService = new OrderService(user);
      return orderService.confirmDeliveredByCustomer(orderId);
    },
    onSuccess: async () => {
      toast.success('Nhận hàng thành công');
      await queryClient.refetchQueries({
        queryKey: ['orders'],
      });
    },
    onError: () => {},
    onSettled: () => {
      router.push('/account/orders');
    },
  });

  const confirmOrder = (orderId: string) => {
    confirmOderMutation.mutate(orderId);
  };

  const convertStatusToNumberStep = (status: string): number => {
    switch (status) {
      // 'pending', 'confirmed', 'shipping', 'shipped', 'cancelled', 'failed', 'delivered'
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;

      case 'shipping':
        return 1;

      case 'shipped':
        return 2;

      case 'cancelled':
        return 0;

      case 'failed':
        return 3;

      case 'delivered':
        return 3;
    }
    return 0;
  };

  return (
    <>
      {detail.isPending || products.length == 0 ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : (
        <Stack className='mx-[30px] gap-4'>
          {/* title */}
          <Group className=' bg-white rounded-md h-[40px] justify-between pr-[15px] items-center'>
            <Button
              className=' text-[#505050] text-[15px] bg-transparent w-fit h-full font-normal '
              onClick={() => {
                router.back();
              }}
            >
              <IconArrowNarrowLeft
                className='  h-[30px] cursor-pointer'
                color='#505050'
              />
              Trở lại
            </Button>

            <Text
              color='#505050'
              className='text-[#505050] text-[15px]'
            >{`Mã đơn hàng ${params.id}`}</Text>
          </Group>
          {/* status */}
          <Group className=' w-full bg-white justify-center items-start rounded-md'>
            <StepperOrder
              numberStep={convertStatusToNumberStep(detail.data?.order_status)}
            />
          </Group>

          {/* order information */}
          <Stack className='w-full bg-white rounded-md p-[20px]'>
            <Group className='w-full gap-1'>
              <IconMapPinFilled
                style={{ color: '#02B1AB' }}
                className='h-[20px]'
              />
              <Text className=' font-bold text-[#02B1AB] text-[15px]'>
                Thông tin nhận hàng
              </Text>
            </Group>
            <Group className='w-full'>
              <Text className=' font-normal text-[15px]'>
                {detail.data.order_username}
              </Text>
              <Text className=' font-normal text-[15px]'>
                {detail.data.order_phone}
              </Text>
            </Group>
            <Text className=' w-full font-normal text-[15px]'>
              {detail.data.order_address.city}
            </Text>
          </Stack>
          <Group className=' w-full gap-2 items-start'>
            <Stack className=' flex-[2] bg-white rounded-md p-[20px]'>
              <Text className=' font-bold text-black text-[15px]'>
                Sản phẩm
              </Text>
              <Grid>
                <Grid.Col
                  className='flex justify-center items-center text-[15px]'
                  span={5}
                >
                  Sản phẩm
                </Grid.Col>
                <Grid.Col
                  className='flex justify-center items-center text-[15px]'
                  span={2}
                >
                  Đơn giá
                </Grid.Col>
                <Grid.Col
                  className='flex justify-center items-center text-[15px]'
                  span={1}
                >
                  SL
                </Grid.Col>
                <Grid.Col
                  className='flex justify-center items-center text-[15px]'
                  span={2}
                >
                  Tổng
                </Grid.Col>
                <Grid.Col
                  className='flex justify-center items-center text-[15px]'
                  span={2}
                >
                  Thành tiền
                </Grid.Col>
              </Grid>
              {detail.data.order_products.map((product: any, index: number) => {
                return (
                  <>
                    <Grid key={index}>
                      <Grid.Col span={2}>
                        <Group justify='center' align='center'>
                          <Image
                            src={products[index]?.product_thumb}
                            // className='h-[30px] w-auto'
                            alt='product'
                            height={35}
                            width={35}
                            component={NextImage}
                          />
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Group
                          justify='center'
                          align='center'
                          className='mt-[10px]'
                        >
                          <Text className='text-[15px] text-ellipsis h-full'>
                            {products[index]?.product_name}
                          </Text>
                        </Group>
                      </Grid.Col>
                      <Grid.Col
                        className='flex justify-center items-center'
                        span={2}
                      >
                        <Group className='items-start gap-0'>
                          <Text className='text-[15px]'>{`${formatMoney(
                            product.item_products[0].product_price
                          )}`}</Text>
                          <Text className='text-[10px]'>đ</Text>
                        </Group>
                      </Grid.Col>
                      <Grid.Col
                        className='flex justify-center items-center'
                        span={1}
                      >
                        <Text className='text-[15px]'>{`${formatMoney(
                          product.item_products[0].product_quantity
                        )}`}</Text>
                      </Grid.Col>
                      <Grid.Col
                        className='flex justify-center items-center'
                        span={2}
                      >
                        <Group className='items-start gap-0'>
                          <Text className='text-[15px]'>{`${formatMoney(
                            product.priceRaw
                          )}`}</Text>
                          <Text className='text-[10px]'>đ</Text>
                        </Group>
                      </Grid.Col>
                      <Grid.Col
                        className='flex justify-center items-center'
                        span={2}
                      >
                        <Group className='items-start gap-0'>
                          <Text className='text-[15px]'>{`${formatMoney(
                            product.priceApplyDiscount
                          )}`}</Text>
                          <Text className='text-[10px]'>đ</Text>
                        </Group>
                      </Grid.Col>
                    </Grid>
                    {detail.data?.order_status == 'delivered' && (
                      <RatingProduct
                        productId={product.item_products[0].productId}
                      />
                    )}
                  </>
                );
              })}
            </Stack>
            <Stack className='flex-[1]'>
              <Stack className='  bg-white rounded-md p-[20px]'>
                <Group className=' justify-between'>
                  <Text className=' font-bold text-[15px]'>Đơn hàng</Text>
                  <Text>{detail.data.order_products.length}</Text>
                </Group>
                <Divider />
                <Group className=' justify-between'>
                  <Text className='text-[15px]'>Tạm tính</Text>
                  <Group className='gap-0 items-start'>
                    <Text className='text-[15px]'>
                      {formatMoney(detail.data.order_checkout.totalPrice)}
                    </Text>
                    <Text className='text-[10px]'>đ</Text>
                  </Group>
                </Group>
                <Group className=' justify-between'>
                  <Text className='text-[15px]'>Phí vận chuyển</Text>
                  <Group className='gap-0 items-start'>
                    <Text className='text-[15px]'>
                      {formatMoney(detail.data.order_checkout.feeShip)}
                    </Text>
                    <Text className='text-[10px]'>đ</Text>
                  </Group>
                </Group>
                <Group className=' justify-between'>
                  <Text className='text-[15px]'>Khuyến mãi</Text>
                  <Group className='gap-0 items-start'>
                    <Text className='text-[15px]'>
                      {formatMoney(detail.data.order_checkout.totalDiscount)}
                    </Text>
                    <Text className='text-[10px]'>đ</Text>
                  </Group>
                </Group>
                <Divider />
                <Group className=' justify-between'>
                  <Text className='text-[15px]'>Tổng tiền</Text>
                  <Group className='gap-0 items-start'>
                    <Text className='text-[20px] text-[#02B1AB] font-bold'>
                      {formatMoney(detail.data.order_checkout.finalPrice)}
                    </Text>
                    <Text className='text-[15px] text-[#02B1AB] font-bold'>
                      đ
                    </Text>
                  </Group>
                </Group>

                {convertStatusToNumberStep(detail.data?.order_status) == 2 && (
                  <Button
                    bg={'#02B1AB'}
                    className=' border-[#02B1AB] bg-0-primary-color-6 text-white'
                    onClick={() => {
                      confirmOrder(params.id);
                    }}
                  >
                    Xác nhận đã nhận hàng
                  </Button>
                )}
              </Stack>
              <Stack className='bg-white rounded-md p-[20px]'>
                <Text className='text-[15px]'>Ghi chú</Text>
                <Textarea value={detail.data.order_note} disabled />
              </Stack>
            </Stack>
          </Group>
        </Stack>
      )}
    </>
  );
};

export default DetailProductPage;
