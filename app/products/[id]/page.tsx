'use client';
import {
  Center,
  Flex,
  Image,
  Text,
  Rating,
  Stack,
  Group,
  Breadcrumbs,
  Anchor,
  Button,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Divider,
  LoadingOverlay,
} from '@mantine/core';
import '../../global.css';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import exampleImage from '@/public/pic/gach.jpg';
import NImage from 'next/image';
import Link from 'next/link';
import CommentService from '@/services/commentService';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { formatMoney } from '@/utils/string';
import { categoryService } from '@/services/categoryService';
import queryClient from '@/helpers/client';
import useCart from '@/helpers/useCart';
import toast from 'react-hot-toast';
import useRQGlobalState from '@/helpers/useRQGlobalState';
import { useRouter } from 'next/navigation';
import CartService from '@/services/cartService';
import UserContext from '@/contexts/UserContext';

const ImageLink = 'https://blog.alliedmarketresearch.com/images/user_icon.png';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState<string | number>(1);
  const router = useRouter();
  router.prefetch('/payment');
  const product = useQuery({
    queryKey: ['product'],
    queryFn: () => productService.getProductById(params.id),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const productId = params.id;
  const category: any = queryClient.getQueryData(['categories']);
  let categoryId = '65427434680cb0bd8f9d776c';

  // get category name by category id
  if (category) {
    category.every((item: any) => {
      if (
        item.category_name == product.data?.product_categories[0].category_name
      ) {
        categoryId = item._id;
        return false;
      }
      return true;
    });
  }
  const comments = useQuery({
    queryKey: ['comments'],
    queryFn: () => CommentService.getAllComments(productId),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const [cart, setCart] = useCart();
  const [productChosen, setProductChosen] = useRQGlobalState(
    'productsChosen',
    []
  );

  const people: any = comments.data;
  const number = '(' + (people?.length || 0) + ' đánh giá)';

  const data = [
    { id: 0, label: 'Tất cả' },
    { id: 5, label: '5 sao' },
    { id: 4, label: '4 sao' },
    { id: 3, label: '3 sao' },
    { id: 2, label: '2 sao' },
    { id: 1, label: '1 sao' },
  ];
  const [isChoosing, setIschoosing] = useState(0);
  const handleOnclick = (id: number) => {
    setIschoosing(id);
  };

  const addMutation = useMutation({
    mutationKey: ['addProductCart'],
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const cartService = new CartService(user);
      return cartService.addProduct(productId, quantity);
    },
    onSuccess: (res) => {},
  });

  return (
    <div className='min-h-full relative h-fit z-[1]'>
      <Breadcrumbs mt={30} className='ml-[100px] mr-[100px] mb-[5px]'>
        <Link href='/' key={0}>
          Trang chủ
        </Link>
        <Link href={`/products?category=${categoryId}`}>
          {product.data?.product_categories[0].category_name}
        </Link>
        <Link href={`/products/${product.data?._id}`}>
          {product.data?.product_name}
        </Link>
      </Breadcrumbs>

      <Flex className=' w-full h-full'>
        <Flex className=' ml-[100px] mr-[100px] h-fit h-min-[279px] w-full md:flex-row'>
          <Flex className=' justify-center items-center bg-white mr-[10px] rounded-[10px] flex-[4] p-[30px]'>
            <Image
              alt='img'
              src={product.data?.product_thumb}
              height={150}
              width={150}
              className=' h-[80px] md:h-[150px] '
            />
          </Flex>
          <Flex className=' p-5 flex-[6] ml-[5px] px-[32px] py-[16px] bg-white rounded-[10px] flex-col h-fit md:h-full'>
            <Flex direction={'column'} className='gap-1'>
              {product.data?.product_brand != 'empty' ? (
                <Link href={'/'}>Brand: {product.data?.product_brand}</Link>
              ) : (
                <></>
              )}
              <Text
                size='15px'
                className=' text-[15px] overflow-hidden text-ellipsis'
              >
                {product.data?.product_name}
              </Text>
              <Rating
                value={product.data?.product_ratingAverage}
                fractions={2}
                readOnly
              />
            </Flex>
            <Flex>
              <Text className=' font-bold md:text-[30px] text-[20px]'>
                {formatMoney(product.data?.product_price)}
              </Text>
              <Text className=' font-bold md:text-[16px] text-[10px]'>đ</Text>
            </Flex>
            <Flex>
              <Stack gap={2}>
                <Text>Số lượng</Text>
                <Group gap={5}>
                  <ActionIcon
                    onClick={() => {
                      const temp =
                        typeof quantity == 'string'
                          ? parseInt(quantity)
                          : quantity;

                      if (temp > 1) setQuantity(temp - 1);
                    }}
                    variant='default'
                    disabled={quantity == 1}
                  >
                    <IconMinus color='#111111' />
                  </ActionIcon>
                  <NumberInput
                    value={quantity}
                    min={1}
                    max={1000}
                    hideControls
                    step={1}
                    allowNegative={false}
                    clampBehavior='strict'
                    onChange={setQuantity}
                  />
                  <ActionIcon
                    variant='default'
                    onClick={() => {
                      const temp =
                        typeof quantity == 'string'
                          ? parseInt(quantity)
                          : quantity;

                      setQuantity(temp + 1);
                    }}
                  >
                    <IconPlus color='#111111' />
                  </ActionIcon>
                </Group>
              </Stack>
            </Flex>
            <Flex className=' flex-col lg:flex-row w-full gap-3 mt-7'>
              <Button
                className='w-[110px] lg:w-[300px] bg-[#02B1AB]'
                disabled={productChosen == null}
                onClick={() => {
                  if (user?.userId) {
                    setProductChosen([
                      {
                        product_name: product.data?.product_name,
                        product_thumb: product.data?.product_thumb,
                        product_description: null,
                        product_price: product.data?.product_price,
                        product_quantity: quantity,
                        product_brand: null,
                        product_unit: null,
                        product_ratingAverage: null,
                        product_categories: null,
                        productId: product.data?._id,
                      },
                    ]);
                    router.push('/payment');
                  } else {
                    toast.error(
                      'Bạn cần phải đăng nhập để thực hiện chức năng này.'
                    );
                  }
                }}
              >
                Mua ngay
              </Button>
              <Button
                onClick={() => {
                  if (user?.user) {
                    if (cart) {
                      const newCart = structuredClone(cart);
                      if (newCart.cart_products == 0) {
                        newCart.cart_products.push({
                          product_name: product.data?.product_name,
                          product_thumb: product.data?.product_thumb,
                          product_description: null,
                          product_price: product.data?.product_price,
                          product_quantity: quantity,
                          product_brand: null,
                          product_unit: null,
                          product_ratingAverage: null,
                          product_categories: null,
                          productId: product.data?._id,
                        });
                      } else {
                        let temp = 0;
                        newCart.cart_products.every(
                          (value: any, index: any, array: any) => {
                            if (
                              value.productId == product.data?._id &&
                              temp == 0
                            ) {
                              value.product_quantity += quantity;
                              temp = 1;
                              return false;
                            }
                            return true;
                          }
                        );
                        if (temp == 0) {
                          newCart.cart_products.push({
                            product_name: product.data?.product_name,
                            product_thumb: product.data?.product_thumb,
                            product_description: null,
                            product_price: product.data?.product_price,
                            product_quantity: quantity,
                            product_brand: null,
                            product_unit: null,
                            product_ratingAverage: null,
                            product_categories: null,
                            productId: product.data?._id,
                          });
                        }
                      }
                      const temp: number =
                        typeof quantity == 'string'
                          ? parseInt(quantity)
                          : quantity;
                      addMutation.mutate({ productId, quantity: temp });

                      setCart(newCart);
                      toast.success(
                        `Thêm ${quantity} sản phẩm vào giỏ hàng thành công.`
                      );
                    } else {
                      toast.error('Thêm sản phẩm thất bại.');
                    }
                  } else {
                    toast.error(
                      'Bạn cần phải đăng nhập để thực hiện chức năng này.'
                    );
                  }
                }}
                className='w-[180px] lg:w-[300px] bg-white text-[#02B1AB] border-[#02B1AB]'
              >
                Thêm vào giỏ hàng
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex className=' mt-[10px] w-full h-full items-center justify-center'>
        <Flex className=' w-full h-full flex-col ml-[100px] mr-[100px] bg-white rounded-[10px] p-[20px] box-content'>
          <Text className=' font-bold'>Thông tin sản phẩm</Text>
          {/* <Text className=' text-[20vm]'>
            Gạch lát nền Porcelain kim cương siêu bóng CMC KC89005 Hưng Gia Bình
            - Nhà phân phối sỉ và lẻ các loại gạch men lát nền, gạch đá bóng
            kiếng, gạch trang trí với giá tốt nhất tại Đà Nẵng, Hội An, Quảng
            Nam, Huế, Gia Lai, Kon Tum... Giao hàng tận nơi toàn quốc. Thông số
            kỹ thuật của gạch lát nền 80x80 siêu bóng CMC KC89005:
            <br />- Tên sản phẩm: Gạch Porcerlain kim cương siêu bóng CMC
            KC89005
            <br /> - Chủng loại: Gạch lát nền 80x80 cm - Kích thước: 800 x 800mm
            <br />- Màu sắc: màu đen, vân trắng, giả đá.
            <br /> - Bề mặt: Phẳng - bóng
            <br /> - Công nghệ: Châu Âu - Sản xuất tại Việt Nam.
            <br /> - Chất liệu: Gạch Granite bán sứ - Siêu bóng
          </Text> */}
          {product.data?.product_description ? (
            <Text className=' text-[20vm]'>
              {product.data.product_description}
            </Text>
          ) : (
            <Text className=' text-[20vm]'>Không có</Text>
          )}
        </Flex>
      </Flex>

      <Flex className=' flex-col ml-[100px] mr-[100px] bg-white rounded-[10px] p-[20px] mt-[10px] mb-[20px]'>
        <Text className=' font-bold'>Đánh giá sản phẩm</Text>
        <Group className='ml-[100px] mr-[100px] justify-center align-middle'>
          <Stack className=' gap-1 justify-center items-center'>
            <Text className=' font-bold text-[50px]'>
              {product.data?.product_ratingAverage}/5
            </Text>
            <Rating
              value={product.data?.product_ratingAverage}
              fractions={2}
              readOnly
            />
            <Text className=' font-normal'>{number}</Text>
          </Stack>
          <Group>
            {data.map((item) => (
              <Button
                key={item.id}
                className={
                  item.id == isChoosing
                    ? 'text-[10px] w-[67px] h-[36px] rounded-[20px] border-[#02B1AB] text-white bg-[#02B1AB]'
                    : 'text-[10px] w-[67px] h-[36px] rounded-[20px] border-[#02B1AB] text-black bg-inherit'
                }
                onClick={() => {
                  handleOnclick(item.id);
                }}
              >
                {item.label}
              </Button>
            ))}
          </Group>
        </Group>

        {/* load comments base on rating score */}
        <Stack>
          {people?.map((person: any) => {
            return (
              (isChoosing == 0 ||
                isChoosing == (person.comment_rating || 3)) && (
                <Stack key={person._id}>
                  <Stack className=' gap-1'>
                    <Group>
                      <Image
                        alt='avt'
                        src={
                          people.user_avatar == null || people.user_avatar == ''
                            ? ImageLink
                            : people.user_avatar
                        }
                        className=' rounded-full w-[35px]'
                      />
                      <Stack className=' gap-0'>
                        <Text className='ml-[5px]'>
                          {person.comment_userName}
                        </Text>
                        <Rating value={person.comment_rating || 3} readOnly />
                      </Stack>
                    </Group>
                    <Text className=' ml-[55px] text-[#BBB] text-[12px]'>
                      {person.createdAt}
                    </Text>
                  </Stack>
                  <Text className=' ml-[60px] text-overflow: ellipsis;'>
                    {person.comment_content}
                  </Text>
                  <Divider my='sm' />
                </Stack>
              )
            );
          })}
        </Stack>
      </Flex>
      {(product.isRefetching ||
        comments.isRefetching ||
        product.isPending ||
        comments.isPending) && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
    </div>
  );
}
