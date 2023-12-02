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
  TextInput,
  Dialog,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMapPinFilled, IconArrowNarrowLeft } from '@tabler/icons-react';
import NImage from 'next/image';
import exampleImage from '@/public/pic/gach.jpg';
import { CartProduct, User } from '@/utils/response';
import queryClient from '@/helpers/client';
import { formatMoney } from '@/utils/string';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLogin from '@/helpers/useLogin';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { add } from 'cypress/types/lodash';
import { checkPhoneFormat } from '@/utils/regex';
import Voucher from '@/components/Vouchers/voucher';
import dynamic from 'next/dynamic';
import '../global.css';

const Payment = () => {
  const router = useRouter();

  // check login status
  const [user, setUser] = useLogin();
  if (!user) {
    setUser();
    router.replace('/');
  }

  // convert string to object
  const [userObject, setUserObject] = useState(
    typeof user == 'string' ? JSON.parse(user) : user
  );

  // control dialog
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedVoucher, setOpenedVoucher] = useState(false);

  // cal cost
  const [cost, setCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    let cost = 0;
    products.map((product) => {
      cost += product.product_price * product.product_quantity;
    });
    setCost(cost);
  }, []);

  // get product from cart page
  const products: CartProduct[] =
    queryClient.getQueryData(['productsChosen']) || [];
  const productsQuery = useQuery({
    queryKey: ['productsChosen'],
    queryFn: () => products,
  });

  // control text input in dialog
  const [phone, setPhone] = useState(userObject.user.phone);
  const [address, setAddress] = useState(
    userObject.user.user_attributes.address
  );

  // if user address null
  const [enableButton, setEnableButton] = useState(
    !!userObject.user.user_attributes.address
  );

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

  // fake voucher
  const vouchers = [
    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 20K',
      description: 'Cho đơn hàng tối thiểu 500k',
      expiry: '31/12/2023',
      detail: '',
      status: true,
    },
    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 50K',
      description: 'Cho đơn hàng tối thiểu 2 triệu',
      expiry: '31/12/2023',
      detail: '',
      status: false,
    },

    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 50k',
      description: 'Cho đơn hàng tối thiểu 500k',
      expiry: '31/12/2023',
      detail: '',
      status: true,
    },
  ];

  const [checkedVoucher, setCheckedVoucher] = useState(0);

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
              <IconArrowNarrowLeft
                className=' absolute top-[10px] left-[50px] h-[30px] cursor-pointer'
                color='#02B1AB'
                onClick={() => {
                  router.back();
                }}
              />
              <Text color='#02B1AB'>Thông tin nhận hàng</Text>
            </Group>
            <Text color='#02B1AB' onClick={toggle} className=' cursor-pointer'>
              Thay đổi
            </Text>
          </Group>
          <Stack>
            <Group>
              <Text>{userObject.user.username}</Text>
              <Text>{userObject.user.phone}</Text>
            </Group>
            {!!userObject.user.user_attributes.address ? (
              <Text>{userObject.user.user_attributes.address}</Text>
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
          <Text
            color='#02B1AB'
            onClick={() => setOpenedVoucher(!openedVoucher)}
            className=' cursor-pointer'
          >
            Chọn khuyến mãi
          </Text>
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
          <Button
            className=' w-full bg-0-primary-color-6'
            onClick={() => {
              if (enableButton) {
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

      <Dialog
        opened={opened}
        withCloseButton
        withBorder
        onClose={() => {
          close();
          setTimeout(() => {
            setPhone(userObject.user.phone);
            setAddress(userObject.user.user_attributes.address);
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
          <TextInput
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
                userObject.user.phone = phone;
                if (enableButton) {
                  userObject.user.user_attributes.address = address;
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
        <Group className='w-full justify-between mt-3'>
          <Text size='sm' mb='xs' fw={500}>
            Khuyến mãi
          </Text>
          <Text size='xs' color='gray'>
            Áp dụng tối đa 1
          </Text>
        </Group>

        <Stack align='center' justify='center'>
          {vouchers.map((voucher, index) => (
            <Voucher
              key={voucher.title}
              image={voucher.image}
              title={voucher.title}
              description={voucher.description}
              expiry={voucher.expiry}
              detail={voucher.detail}
              status={voucher.status}
              setChecked={setCheckedVoucher}
              index={index}
              isChecked={index === checkedVoucher}
            />
          ))}
          <Button
            onClick={() => {
              toast.success('Chọn voucher thành công.');
              setOpenedVoucher(false);
            }}
            className=' w-full bg-0-primary-color-6 '
          >
            Áp dụng
          </Button>
        </Stack>
      </Dialog>

      <Toaster position='bottom-center' reverseOrder={false} />
    </Group>
  );
};

export default dynamic(() => Promise.resolve(Payment), { ssr: false });
