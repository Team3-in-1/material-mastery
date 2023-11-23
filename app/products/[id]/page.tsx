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
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import exampleImage from '@/public/pic/gach.jpg';
import NImage from 'next/image';
import Link from 'next/link';
import CommentService from '@/services/commentService';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

export default function ProductDetails({ params }: { params: { id: string } }) {
  const handlersRef = useRef<NumberInputHandlers>(null);

  const comments = useQuery({
    queryKey: ['comments'],
    queryFn: CommentService.getAllComments,
  });

  const product = useQuery({
    queryKey: ['product'],
    queryFn: () => productService.getProductById(params.id),
  });

  const people = comments.data;
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

  return (
    <div className='min-h-max relative h-fit z-1'>
      <Breadcrumbs mt={30} className='ml-[100px] mr-[100px] mb-[5px]'>
        <Anchor href='/' key={0}>
          Trang chủ
        </Anchor>
        <Anchor
          href={`/products?category=${product.data?.product_categories[0].category_name}`}
        >
          {product.data?.product_categories[0].category_name}
        </Anchor>
        <Anchor href={`/products/${product.data?._id}`}>
          {product.data?.product_name}
        </Anchor>
      </Breadcrumbs>

      <Flex className=' w-full h-full'>
        <Flex className=' ml-[100px] mr-[100px] h-fit h-min-[279px] w-full md:flex-row'>
          <Flex className=' justify-center items-center bg-white mr-[10px] rounded-[10px] flex-[4] p-[30px]'>
            <Image
              alt='img'
              src={product.data?.product_thumb}
              component={NImage}
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
                {product.data?.product_price}
              </Text>
              <Text className=' font-bold md:text-[16px] text-[10px]'>đ</Text>
            </Flex>
            <Flex>
              <Stack gap={2}>
                <Text>Số lượng</Text>
                <Group gap={5}>
                  <ActionIcon
                    onClick={() => {
                      handlersRef.current?.decrement();
                    }}
                    variant='default'
                  >
                    <IconMinus color='#111111' />
                  </ActionIcon>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={1000}
                    hideControls
                    handlersRef={handlersRef}
                    step={1}
                    allowNegative={false}
                    clampBehavior='strict'
                  />
                  <ActionIcon
                    variant='default'
                    onClick={() => {
                      handlersRef.current?.increment();
                    }}
                  >
                    <IconPlus color='#111111' />
                  </ActionIcon>
                </Group>
              </Stack>
            </Flex>
            <Flex className=' flex-col lg:flex-row w-full gap-3 mt-7'>
              <Button className='w-[110px] lg:w-[300px] bg-[#02B1AB]'>
                Mua ngay
              </Button>
              <Button className='w-[180px] lg:w-[300px] bg-white text-[#02B1AB] border-[#02B1AB]'>
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
          {people?.map(
            (person) =>
              (isChoosing == 0 || isChoosing == 3) && (
                <Stack key={person._id}>
                  <Stack className=' gap-1'>
                    <Group>
                      <Image
                        alt='avt'
                        src={exampleImage}
                        component={NImage}
                        className=' rounded-full w-[35px]'
                      />
                      <Stack className=' gap-0'>
                        <Text className='ml-[5px]'>Khai</Text>
                        <Rating defaultValue={3} readOnly />
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
          )}
        </Stack>
      </Flex>
    </div>
  );
}
