'use client';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Pagination,
  Stack,
  Text,
} from '@mantine/core';
import Nav from './nav';
import Order from './order';
import { useContext, useEffect, useRef, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import UserContext from '@/contexts/UserContext';
import OrderService from '@/services/orderService';
import '../../../global.css';
import { useDisclosure } from '@mantine/hooks';

const LIMIT_ORDERS = 3;

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [numberPage, setNumberPage] = useState(0);
  const start = useRef(1);
  let temp = 1;
  const numberOfOrder = useQuery({
    queryKey: ['numberOfOrder'],
    queryFn: async () => {
      const orderService = new OrderService(user);
      const res = await orderService.getNumberOfOrderByCustomer();
      setTotalOrders(
        res.pending +
          res.confirmed +
          res.cancelled +
          res.shipping +
          res.shipped +
          res.delivered +
          res.failed
      );
      return res;
    },
    enabled: !!user,
  });
  useEffect(() => {
    start.current = page * LIMIT_ORDERS;
  }, [page]);
  useEffect(() => {
    if (numberOfOrder.isSuccess) {
      switch (orderStatus) {
        case 0:
          setNumberPage(Math.ceil(totalOrders / LIMIT_ORDERS));
          break;
        case 1:
          setNumberPage(Math.ceil(numberOfOrder.data.pending / LIMIT_ORDERS));
          break;
        case 2:
          setNumberPage(Math.ceil(numberOfOrder.data.confirmed / LIMIT_ORDERS));

          break;
        case 3:
          setNumberPage(Math.ceil(numberOfOrder.data.shipping / LIMIT_ORDERS));

          break;
        case 4:
          setNumberPage(
            Math.ceil(
              (numberOfOrder.data.delivered + numberOfOrder.data.shipped) /
                LIMIT_ORDERS
            )
          );

          break;
        case 5:
          setNumberPage(
            Math.ceil(
              (numberOfOrder.data.cancelled + numberOfOrder.data.failed) /
                LIMIT_ORDERS
            )
          );
          break;
      }
    }
  }, [orderStatus, totalOrders]);

  const orders = useQuery({
    queryKey: ['orders', totalOrders],
    queryFn: () => {
      const orderService = new OrderService(user);
      return orderService.getOrders(1, totalOrders);
    },
    staleTime: 500000,
    enabled: !!user && !!numberOfOrder,
    placeholderData: keepPreviousData,
  });

  return (
    <Stack className='mx-[100px] h-full justify-center'>
      <Nav
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        start={start}
        setPage={setPage}
      />
      {orders.isPending ? (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      ) : (
        <>
          {orders.data.orders.map((order: any) => {
            if (order.order_products.length > 0) {
              switch (orderStatus) {
                case 0:
                  if (
                    temp >= start.current &&
                    temp <= start.current * LIMIT_ORDERS - 1
                  ) {
                    temp++;

                    // console.log(
                    //   temp <= start.current * LIMIT_ORDERS - 1
                    // );
                    // console.log('temp', temp);
                    // console.log(start.current * LIMIT_ORDERS - 1);
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
                  } else {
                    temp++;
                  }

                  console.log('aa');
                  break;
                case 1:
                  if (order.order_status == 'pending') {
                    if (
                      temp >= start.current &&
                      temp <= start.current * LIMIT_ORDERS - 1
                    ) {
                      temp++;

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
                    } else {
                      temp++;
                    }
                  }
                  console.log('bb');

                  break;
                case 2:
                  if (order.order_status == 'confirmed') {
                    if (
                      temp >= start.current &&
                      temp <= start.current * LIMIT_ORDERS - 1
                    ) {
                      temp++;

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
                    } else {
                      temp++;
                    }
                  }
                  console.log('bb');

                  break;
                case 3:
                  if (order.order_status == 'shipping') {
                    if (
                      temp >= start.current &&
                      temp <= start.current * LIMIT_ORDERS - 1
                    ) {
                      temp++;

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
                    } else {
                      temp++;
                    }
                  }
                  console.log('bb');

                  break;
                case 4:
                  if (
                    order.order_status == 'delivered' ||
                    order.order_status == 'shipped'
                  ) {
                    if (
                      temp >= start.current &&
                      temp <= start.current * LIMIT_ORDERS - 1
                    ) {
                      temp++;
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
                    } else {
                      temp++;
                    }
                  }
                  console.log('bb');

                  break;
                case 5:
                  if (
                    order.order_status == 'cancelled' ||
                    order.order_status == 'failed'
                  ) {
                    if (
                      temp >= start.current &&
                      temp <= start.current * LIMIT_ORDERS - 1
                    ) {
                      temp++;

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
                    } else {
                      temp++;
                    }
                  }
                  console.log('bb');

                  break;
              }
              // console.log('temp', temp);
            }
          })}
        </>
      )}
      <Pagination total={numberPage} value={page} onChange={setPage} />
    </Stack>
  );
};

export default OrdersPage;
