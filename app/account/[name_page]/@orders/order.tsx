import { formatMoney } from '@/utils/string';
import { Stack, Group, Text, Divider, Image, Button } from '@mantine/core';
import Product from './product';
import { useMutation } from '@tanstack/react-query';
import OrderService from '@/services/orderService';
import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import toast from 'react-hot-toast';
import queryClient from '@/helpers/client';
import { useRouter } from 'next/navigation';

const Order = ({
  orderId,
  orderStatus,
  paymentStatus,
  finalPrice,
  products,
}: {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  finalPrice: number | string;
  products: any;
}) => {
  // 'pending', 'confirmed', 'shipping', 'shipped', 'cancelled', 'failed', 'delivered'
  let status = 'Chờ xác nhận';
  switch (orderStatus) {
    case 'confirmed':
      status = 'Đã xác nhận';
      break;
    case 'shipping':
      status = 'Đang giao';
      break;
    case 'shipped':
      status = 'Đã giao';
      break;
    case 'cancelled':
      status = 'Đã hủy';
      break;
    case 'failed':
      status = 'Giao thất bại';
      break;
    case 'delivered':
      status = 'Giao hàng thành công';
      break;
  }

  const { user } = useContext(UserContext);
  const cancelOrderMutation = useMutation({
    mutationKey: ['cacelOrder'],
    mutationFn: () => {
      const orderService = new OrderService(user);
      return orderService.cancelOrder(orderId);
    },
    onSuccess: async (res) => {
      toast.success('Hủy đơn hàng thành công.');
      await queryClient.refetchQueries({
        queryKey: ['orders'],
        exact: true,
      });
    },
    onError: () => {
      toast.error('Hủy đơn hàng thất bại.');
    },
  });

  const handleCancelButton = () => {
    cancelOrderMutation.mutate();
  };

  const router = useRouter();

  return (
    <Stack className='bg-white p-[20px] rounded-[10px]'>
      {/* infor of order */}
      <Group className='w-full justify-between'>
        <Group>
          <Text className='  text-[#8E8E8E]'>Mã đơn hàng</Text>
          <Text className='text-[#8E8E8E]'>{orderId}</Text>
        </Group>
        <Group>
          <Text className=' font-light text-[#0063FF]'>
            {paymentStatus == 'pending' ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </Text>
          <Divider orientation='vertical' />
          <Text className=' font-light text-[#FFA903]'>{status}</Text>
        </Group>
      </Group>
      <Divider />

      {/* list products */}
      <Stack>
        {products.map((product: any) => {
          return (
            <Product
              key={product.item_products[0].productId}
              productId={product.item_products[0].productId}
              quantity={product.item_products[0].product_quantity}
              priceRaw={product.priceRaw}
            />
          );
        })}
      </Stack>
      <Divider />

      {/* cost of order */}
      <Group className=' w-full justify-between'>
        <Button
          className=' bg-transparent text-[#02B1AB] '
          onClick={() => {
            router.push(`/account/orders/${orderId}`);
          }}
        >
          Xem chi tiết
        </Button>
        <Group className=' justify-center items-center'>
          <Text className='mt-[3px]'>Thành tiền</Text>
          <Group className=' gap-0 mt-[3px] text-[#02B1AB] items-start'>
            <Text>{formatMoney(finalPrice)}</Text>
            <Text className=' text-[10px]'>đ</Text>
          </Group>
          {status == 'Chờ xác nhận' && (
            <Button
              bg={'transparent'}
              className=' bg-transparent w-[80px] h-full text-[15px] text-red-500'
              onClick={handleCancelButton}
            >
              Hủy
            </Button>
          )}
        </Group>
      </Group>
    </Stack>
  );
};

export default Order;
