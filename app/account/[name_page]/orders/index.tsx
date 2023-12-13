'use client';
import { LoadingOverlay, Pagination, Stack } from '@mantine/core';
import Nav from './nav';
import Order from './order';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserContext from '@/contexts/UserContext';
import OrderService from '@/services/orderService';

const items: any = [];

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const orders = useQuery({
    queryKey: ['orders'],
    queryFn: () => {
      const orderService = new OrderService(user);
      return orderService.getOrders();
    },
    enabled: !!user,
  });
  const [orderStatus, setOrderStatus] = useState(0);
  return (
    <Stack className='mx-[100px] h-full justify-center'>
      <Nav orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
      {orders.isPending ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : (
        <>
          {orders.data.map((order: any) => {
            switch (orderStatus) {
              case 0:
                return (
                  <Order
                    key={order._id}
                    orderId={order._id}
                    orderStatus={order.order_status}
                    paymentStatus={order.order_payment.status}
                    finalPrice={order.order_checkout.finalPrice}
                    products={order.order_products}
                  />
                );
              case 1:
                if (order.order_status == 'pending') {
                  return (
                    <Order
                      key={order._id}
                      orderId={order._id}
                      orderStatus={order.order_status}
                      paymentStatus={order.order_payment.status}
                      finalPrice={order.order_checkout.finalPrice}
                      products={order.order_products}
                    />
                  );
                }
              case 2:
                if (order.order_status == 'confirmed') {
                  return (
                    <Order
                      key={order._id}
                      orderId={order._id}
                      orderStatus={order.order_status}
                      paymentStatus={order.order_payment.status}
                      finalPrice={order.order_checkout.finalPrice}
                      products={order.order_products}
                    />
                  );
                }
              case 3:
                if (order.order_status == 'shipping') {
                  return (
                    <Order
                      key={order._id}
                      orderId={order._id}
                      orderStatus={order.order_status}
                      paymentStatus={order.order_payment.status}
                      finalPrice={order.order_checkout.finalPrice}
                      products={order.order_products}
                    />
                  );
                }
              case 4:
                if (
                  order.order_status == 'delivered' ||
                  order.order_status == 'shipped'
                ) {
                  return (
                    <Order
                      key={order._id}
                      orderId={order._id}
                      orderStatus={order.order_status}
                      paymentStatus={order.order_payment.status}
                      finalPrice={order.order_checkout.finalPrice}
                      products={order.order_products}
                    />
                  );
                }
              case 5:
                if (
                  order.order_status == 'cancelled' ||
                  order.order_status == 'failed'
                ) {
                  return (
                    <Order
                      key={order._id}
                      orderId={order._id}
                      orderStatus={order.order_status}
                      paymentStatus={order.order_payment.status}
                      finalPrice={order.order_checkout.finalPrice}
                      products={order.order_products}
                    />
                  );
                }
            }
          })}
        </>
      )}
      <Pagination total={5} className=' just' />
    </Stack>
  );
};

export default OrdersPage;
