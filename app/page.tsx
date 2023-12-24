'use client';
import '@/styles/global.css';
import Link from 'next/link';
import {
  Grid,
  Container,
  Stack,
  Text,
  Divider,
  Image,
  LoadingOverlay,
} from '@mantine/core';
import banner from '@/public/pic/banner.png';
import NextImage from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { Carousel } from '@mantine/carousel';
import { splitArray } from '@/utils/array';
import { Product } from '@/utils/response';
import { ProductCards } from '@/components/Product/productCards';
import queryClient from '@/helpers/client';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { productService } from '@/services/productService';

const data: Product[] = [];
for (let index = 0; index < 14; index++) {
  data.push({
    _id: Math.random() + '',
    product_name: "1/2\" x 4' x 8' Drywall Panel",
    product_thumb: 'https://biiibo.com/files/p_1000149007_small.jpg',
    product_description: '',
    product_price: 350000,
    product_quantity: 10,
    product_brand: 'empty',
    product_unit: 'Panel',
    product_ratingAverage: 4.5,
    product_categories: ['654272bffe4d153ff2b3078e'],
    createdAt: '2023-11-02T14:05:58.429Z',
    updatedAt: '2023-11-02T14:10:58.765Z',
    product_slug: "12\"-x-4'-x-8'-drywall-panel",
    __v: 0,
  });
}

function Home() {
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { user } = useContext(UserContext);

  const promotionalProducts = useQuery({
    queryKey: ['Promotional Products'],
    queryFn: () => {
      return productService.getAllProducts();
    },
    initialData: data,
  });

  return (
    <Container
      mt={70}
      px={50}
      py={30}
      fluid
      mih='100vh'
      pos='relative'
      style={{
        backgroundColor: '#f1f3f5',
        zIndex: 1,
      }}
    >
      <Grid w='100%'>
        <Grid.Col span={2}>
          <Stack
            bg='#fff'
            gap='xs'
            px={20}
            py={10}
            style={{
              textAlign: 'left',
            }}
            className=' rounded-md'
          >
            <Text size='lg' fw={700} pt={10}>
              Trang chủ
            </Text>
            <Divider />
            {categories.isSuccess &&
              categories.data.map((category) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category._id}`}
                  style={{
                    color: '#8E8E8E',
                    padding: '8px',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                  className=' hover:bg-slate-100 rounded-[8px]'
                >
                  {category.category_name}
                </Link>
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={10}>
          <Container
            fluid
            className='rounded-md'
            py={10}
            style={{
              background: 'white',
            }}
          >
            <Image
              component={NextImage}
              radius='md'
              src={banner}
              alt='banner'
              w='71.75rem'
              h='20.438rem'
            />
          </Container>
          <Container className='bg-white rounded-md' fluid mt={20} py={10}>
            <p className='text-[1rem] py-1 font-bold'>Sản phẩm mới</p>
            <Carousel withIndicators withControls={false}>
              {splitArray(promotionalProducts.data, 5).map((slide) => {
                return (
                  <Carousel.Slide key={Math.floor(Math.random() * Date.now())}>
                    <ProductCards
                      data={slide}
                      selectedRating={'Tất cả'}
                      selectedSort={'Sản phẩm mới'}
                    />
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          </Container>
          <Container
            fluid
            mt={20}
            py={10}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <p className='text-[1rem] py-1 font-bold'>Bán chạy</p>
            <Carousel withIndicators withControls={false}>
              {splitArray(promotionalProducts.data, 5).map((slide) => {
                return (
                  <Carousel.Slide key={Math.floor(Math.random() * Date.now())}>
                    <ProductCards
                      data={slide}
                      selectedRating={'Tất cả'}
                      selectedSort={null}
                    />
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          </Container>
        </Grid.Col>
      </Grid>
      {(promotionalProducts.isPending ||
        categories.isPending ||
        (true && !user)) && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
    </Container>
  );
}

export default Home;
