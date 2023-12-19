'use client';
import '@/styles/global.css';
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
  TextInput,
  Dialog,
  LoadingOverlay,
  Box,
  Loader,
  Popover,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMapPinFilled, IconArrowNarrowLeft } from '@tabler/icons-react';
import NImage from 'next/image';
import exampleImage from '@/public/pic/gach.jpg';
import { CartProduct, User } from '@/utils/response';
import queryClient from '@/helpers/client';
import { formatMoney } from '@/utils/string';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { add } from 'cypress/types/lodash';
import { checkPhoneFormat } from '@/utils/regex';
import Voucher from '@/components/Vouchers/voucher';
import dynamic from 'next/dynamic';
import UserContext from '@/contexts/UserContext';
import VoucherPayment from './voucher';
import OrderService from '@/services/orderService';
import { userService } from '@/services/userService';

const Payment = () => {
  const router = useRouter();

  // check login status
  const { user, setUser } = useContext(UserContext);
  if (!user) {
    return <></>;
  }

  // control dialog
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedVoucher, setOpenedVoucher] = useState(false);

  // cal cost
  const [totalPrice, setTotalPrice] = useState(0);
  const [feeShip, setFeeShip] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  // get product from cart page
  const products: CartProduct[] =
    queryClient.getQueryData(['productsChosen']) || [];
  const productsQuery = useQuery({
    queryKey: ['productsChosen'],
    queryFn: () => products,
  });

  //get user infor
  const userInfor = useQuery({
    queryKey: ['userInfor'],
    queryFn: () => {
      return userService.getUserById(user);
    },
    enabled: !!user,
    staleTime: Infinity,
    gcTime: 0,
  });

  // control text input in dialog\
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // if user address null
  const [enableButton, setEnableButton] = useState(false);

  const isSet = useRef(false);

  if (!userInfor.isPending && !isSet.current) {
    setPhone(userInfor.data.phone);
    setAddress(userInfor.data.user_attributes.address);
    setEnableButton(!!userInfor.data.user_attributes.address);
    isSet.current = true;
  }

  // Estimated delivery date is equal to the current date plus 5
  const getDay = () => {
    const d = new Date();
    let date = d.getDate() + 5;
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    if (date > 28) {
      if (date == 29) {
        if (month == 2) {
          if (year % 4 != 0) {
            date--;
          }
        }
      } else if (date == 30) {
        if (month == 2) {
          date = date - 2;
        }
      } else if (date == 31) {
        if (month == 2) {
          date = date - 3;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          date--;
        }
      } else {
        if (month == 2) {
          month++;
          if (year % 4 == 0) {
            date = date - 29;
          } else {
            date = date - 29;
          }
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          month++;
          date = date - 30;
        } else {
          month++;
          if (month == 13) {
            month = 1;
            year++;
          }
          date = date - 31;
        }
      }
    }

    return date + '-' + month + '-' + year;
  };

  //const [checkedVoucher, setCheckedVoucher] = useState('');
  const [checkedProduct, setCheckedProduct] = useState('');

  const voucherChosen: any = [];
  const id2Index: any = {};
  for (let i = 0; i < products.length; i++) {
    const b = useState('');
    const c = useState('');

    voucherChosen.push(b);

    const key: any = products[i].productId ? products[i].productId : -1;
    id2Index[key] = i;
  }

  const orderMutation = useMutation({
    mutationKey: ['order'],
    mutationFn: (orders) => {
      const orderService = new OrderService(user);
      return orderService.order(address, 'pending', 'upon receipt', '', orders);
    },
    onSuccess: async (res) => {
      if (res == 200) {
        toast.success('Thanh toán thành công.');

        await queryClient.invalidateQueries({
          queryKey: ['cart'],
        });

        router.replace('/account/orders');
      } else if (res == 400) {
        toast.error('Sản phẩm không còn đủ hàng. ');
        router.back();
      }
    },
    onError: (error) => {
      console.log('error', error);
      toast.error('Thanh toán thất bại.');
      router.back();
    },
  });

  const [method, setMethod] = useState(true);

  const checkOut = useMutation({
    mutationKey: ['checkout'],
    mutationFn: () => {
      const payload: any = [];
      products.map((product) => {
        const id: any = product.productId ? product.productId : 0;

        if (voucherChosen[id2Index[id]][0]._id) {
          payload.push({
            discounts: [
              {
                discountId: voucherChosen[id2Index[id]][0]._id,
                code: voucherChosen[id2Index[id]][0].code,
              },
            ],
            products: [
              {
                price: product.product_price,
                quantity: product.product_quantity,
                productId: product.productId,
              },
            ],
          });
        } else {
          payload.push({
            discounts: [],
            products: [
              {
                price: product.product_price,
                quantity: product.product_quantity,
                productId: product.productId,
              },
            ],
          });
        }
      });
      const orderService = new OrderService(user);
      return orderService.checkOut(payload);
    },
    onSuccess: (res) => {
      setTotalPrice(res.totalPrice);
      setFeeShip(res.feeShip);
      setTotalDiscount(res.totalDiscount);
      setFinalPrice(res.finalPrice);
    },
    gcTime: 0,
  });

  if (products.length == 0) {
    router.replace('/cart');
  } else {
    useEffect(() => {
      checkOut.mutate();
    }, []);
  }

  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  // if (checkOut.isPending) {
  //   return (
  //     <LoadingOverlay
  //       visible={true}
  //       zIndex={1000}
  //       overlayProps={{ radius: 'sm', blur: 2 }}
  //     />
  //   );
  // }

  if (userInfor.isPending) {
    return <></>;
  }
  return (
    // devide page into 2 col

    <Group
      gap={15}
      justify='center'
      align='start'
      className='relative z-[1] bg-[#f1f3f5] min-h-full w-full h-fit mt-[100px] mb-[30px] px-[100px] overflow-hidden'
    >
      {/*col 1*/}
      <Stack className='flex-[2]'>
        {/*recipient information*/}
        <Stack className='bg-white rounded-[10px] w-full px-[32px] py-[24px]'>
          <Group justify='space-between' className='w-full'>
            <Group>
              <IconMapPinFilled style={{ color: '#02B1AB' }} />
              <IconArrowNarrowLeft
                className=' absolute top-[8px] left-[50px] h-[30px] cursor-pointer'
                color='#02B1AB'
                onClick={() => {
                  router.back();
                }}
              />
              <Text color='#02B1AB'>Thông tin nhận hàng</Text>
            </Group>

            <Button
              c='#02B1AB'
              bg='white'
              onClick={toggle}
              // className=' cursor-pointer'
            >
              Thay đổi
            </Button>
            {/* <Popover opened={opened} width={300}>
              <Popover.Target>
                <Button
                  c='#02B1AB'
                  bg='white'
                  onClick={toggle}
                  // className=' cursor-pointer'
                >
                  Thay đổi
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size='sm' mb='xs' fw={500}>
                  Thay đổi thông tin nhận hàng
                </Text>

                <Stack align='center' justify='center'>
                  <TextInput
                    label='Số điện thoại nhận hàng'
                    withAsterisk
                    className='w-full'
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.currentTarget.value);
                    }}
                  />
                  <Textarea
                    label='Địa chỉ nhận hàng'
                    withAsterisk
                    className='w-full'
                    disabled={!enableButton}
                    value={address}
                    onChange={(event) => {
                      setAddress(event.currentTarget.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (checkPhoneFormat(phone)) {
                        toast.error('Số điện thoại không hợp lệ');
                      } else if (enableButton && address.length == 0) {
                        toast.error('Địa chỉ giao hàng không được để trống.');
                      } else {
                        userInfor.data.phone = phone;
                        if (enableButton) {
                          userInfor.data.user_attributes.address = address;
                        }
                        close();
                        toast.success('Thay đổi thành công.');
                      }
                    }}
                    className=' w-full bg-0-primary-color-6 '
                  >
                    Chỉnh sửa
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover> */}
          </Group>
          <Stack>
            <Group>
              <Text>{userInfor.data.display_name}</Text>
              <Text>{userInfor.data.phone}</Text>
            </Group>
            {!!userInfor.data.user_attributes.address ? (
              <Text>{userInfor.data.user_attributes.address}</Text>
            ) : (
              <Stack gap={0}>
                <Text className='text-[red]' size='xs'>
                  *Cần bổ sung địa chỉ giao hàng
                </Text>
                <Link href={'/account/details'}>
                  Cập nhập địa chỉ giao hàng
                </Link>
              </Stack>
            )}
          </Stack>
        </Stack>

        {/*scheduled time*/}
        <Group className='gap-10 px-[32px] py-[24px] border-[#02B1AB] border-[1px] w-full'>
          <Text color='#02B1AB'>Dự kiến giao hàng:</Text>
          <Text color='#02B1AB'>{getDay()}</Text>
        </Group>

        {/*products*/}
        <Stack className='bg-white rounded-[10px] w-full px-[32px] py-[24px]'>
          <Text fw={700}>Sản phẩm</Text>
          <Grid>
            <Grid.Col
              style={{ display: 'flex', justifyContent: 'center' }}
              span={5}
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
              <Text color='#252525'>Tổng</Text>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Text color='#252525'>Khuyến mãi</Text>
            </Grid.Col>
          </Grid>

          {products.map((product, index) => {
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
                <Grid.Col span={3}>
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
                <Grid.Col
                  span={2}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Group align='start' gap={0}>
                    {voucherChosen[index][0] == '' ? (
                      <Text
                        color='#02B1AB'
                        onClick={() => {
                          if (!openedVoucher) {
                            setCheckedProduct(product.productId || '');
                            setOpenedVoucher(true);
                          } else {
                            setOpenedVoucher(false);
                            if (product.productId != checkedProduct) {
                              setCheckedProduct(product.productId || '');
                              setOpenedVoucher(true);
                            } else {
                              setOpenedVoucher(false);
                            }
                          }
                        }}
                        className=' cursor-pointer'
                      >
                        Chọn
                      </Text>
                    ) : (
                      <Text
                        color='#02B1AB'
                        onClick={() => {
                          setCheckedProduct(product.productId || '');
                          setOpenedVoucher(!openedVoucher);
                        }}
                        className=' cursor-pointer'
                      >
                        {voucherChosen[index][0].code}
                      </Text>
                    )}
                  </Group>
                </Grid.Col>
              </Grid>
            );
          })}
        </Stack>

        {/* promo
        <Group
          className='bg-white rounded-[10px] w-full p-[30px]'
          justify='space-between'
        >
          <Text color='#252525'>Khuyến mãi</Text>
          <Text
            color='#02B1AB'
            onClick={() => setOpenedVoucher(!openedVoucher)}
            className=' cursor-pointer'
          >
            Chọn khuyến mãi
          </Text>
        </Group> */}

        {/*payment method*/}
        <Stack className='w-full rounded-[10px] py-[24px] px-[32px] bg-white'>
          <Text fw={700}>Phương thức thanh toán</Text>

          <Stack className=' cursor-pointer'>
            <Radio
              label='Thanh toán khi nhận hàng'
              value='1'
              checked={method}
              onChange={(event) => {}}
              onClick={() => setMethod(!method)}
            />
            {/* <Radio label='Thanh toán khi nhận hàng' value='2' />
              <Radio label='Thanh toán khi nhận hàng' value='3' />
              <Radio label='Thanh toán khi nhận hàng' value='4' /> */}
          </Stack>
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
            {checkOut.isPending ? (
              <Loader color='#02B1AB' size={10} />
            ) : (
              <Group gap={0} align='start'>
                <Text>{formatMoney(totalPrice)}</Text>
                <Text size='10px'>đ</Text>
              </Group>
            )}
          </Group>
          <Group justify='space-between'>
            <Text>Phí vận chuyển</Text>
            {checkOut.isPending ? (
              <Loader color='#02B1AB' size={10} />
            ) : (
              <Group gap={0} align='start'>
                <Text>{formatMoney(feeShip)}</Text>
                <Text size='10px'>đ</Text>
              </Group>
            )}
          </Group>
          <Group justify='space-between'>
            <Text>Khuyến mãi</Text>
            {checkOut.isPending ? (
              <Loader color='#02B1AB' size={10} />
            ) : (
              <Group gap={0} align='start'>
                <Text>{formatMoney(totalDiscount)}</Text>
                <Text size='10px'>đ</Text>
              </Group>
            )}
          </Group>
          <Divider />
          <Group justify='space-between'>
            <Text>Tổng tiền</Text>
            {checkOut.isPending ? (
              <Loader color='#02B1AB' size={10} />
            ) : (
              <Group gap={0} align='start'>
                <Text color='#02B1AB' fw={600} size='30px'>
                  {formatMoney(finalPrice)}
                </Text>
                <Text color='#02B1AB' fw={600} size='15px'>
                  đ{' '}
                </Text>
              </Group>
            )}
          </Group>

          <Button
            className=' w-full bg-0-primary-color-6'
            onClick={() => {
              if (enableButton) {
                if (method) {
                  const orders: any = [];
                  products.map((product) => {
                    const id: any = product.productId ? product.productId : 0;

                    if (voucherChosen[id2Index[id]][0]._id) {
                      orders.push({
                        discounts: [
                          {
                            discountId: voucherChosen[id2Index[id]][0]._id,
                            code: voucherChosen[id2Index[id]][0].code,
                          },
                        ],
                        products: [
                          {
                            price: product.product_price,
                            quantity: product.product_quantity,
                            productId: product.productId,
                          },
                        ],
                      });
                    } else {
                      orders.push({
                        discounts: [],
                        products: [
                          {
                            price: product.product_price,
                            quantity: product.product_quantity,
                            productId: product.productId,
                          },
                        ],
                      });
                    }
                  });
                  orderMutation.mutate(orders);
                  setIsOrderProcessing(true);
                } else {
                  toast.error('Bạn chưa chọn hình thức thanh toán.');
                }
              } else {
                toast.error(
                  'Bạn không thể thanh toán khi không có đỉa chỉ giao hàng.'
                );
              }
            }}
          >
            Thanh toán
          </Button>
        </Stack>

        <Stack className='bg-white p-8 rounded-[10px]'>
          <Text className='font-medium'>Ghi chú</Text>
          <Textarea placeholder='Ghi chú' />
        </Stack>
      </Stack>

      {/* change information */}
      <Dialog
        opened={opened}
        withCloseButton
        withBorder
        onClose={() => {
          close();
          setTimeout(() => {
            setPhone(userInfor.data.phone);
            setAddress(userInfor.data.user_attributes.address);
          }, 500);
        }}
        radius='md'
        size={500}
        position={{ bottom: 10, right: 10 }}
      >
        <Text size='sm' mb='xs' fw={500}>
          Thay đổi thông tin nhận hàng
        </Text>

        <Stack align='center' justify='center'>
          <TextInput
            label='Số điện thoại nhận hàng'
            withAsterisk
            className='w-full'
            value={phone}
            onChange={(event) => {
              setPhone(event.currentTarget.value);
            }}
          />
          <Textarea
            label='Địa chỉ nhận hàng'
            withAsterisk
            className='w-full'
            disabled={!enableButton}
            value={address}
            onChange={(event) => {
              setAddress(event.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              if (checkPhoneFormat(phone)) {
                toast.error('Số điện thoại không hợp lệ');
              } else if (enableButton && address.length == 0) {
                toast.error('Địa chỉ giao hàng không được để trống.');
              } else {
                userInfor.data.phone = phone;
                if (enableButton) {
                  userInfor.data.user_attributes.address = address;
                }
                close();
                toast.success('Thay đổi thành công.');
              }
            }}
            className=' w-full bg-0-primary-color-6 '
          >
            Chỉnh sửa
          </Button>
        </Stack>
      </Dialog>

      <Dialog
        opened={openedVoucher}
        withCloseButton
        withBorder
        onClose={() => {
          setOpenedVoucher(false);
        }}
        radius='md'
        size={500}
        position={{ bottom: 10, right: 10 }}
      >
        <Stack gap={0} className='w-full mt-3'>
          <Text className=' text-[12px]'>Khuyến mãi</Text>
          <Group className='justify-between items-center mb-4'>
            <Text size='sm' fw={500} className=' text-ellipsis'>
              {products[id2Index[checkedProduct]]
                ? products[id2Index[checkedProduct]].product_name
                : ''}
            </Text>
            <Text size='xs' color='gray'>
              Áp dụng tối đa 1
            </Text>
          </Group>
        </Stack>

        <VoucherPayment
          productId={checkedProduct}
          setOpenedVoucher={setOpenedVoucher}
          orderValue={
            products[id2Index[checkedProduct]]
              ? products[id2Index[checkedProduct]].product_price *
                products[id2Index[checkedProduct]].product_quantity
              : 0
          }
          voucherChosen={voucherChosen[id2Index[checkedProduct] | 0]}
          checkOut={checkOut}
        />
      </Dialog>
      <LoadingOverlay
        visible={isOrderProcessing || userInfor.isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    </Group>
  );
};

// export default dynamic(() => Promise.resolve(Payment), { ssr: false });
export default Payment;
