'use client';
import '@/styles/global.css';
import { ProductCards } from '@/components/Product/productCards';
import { CategoryNav } from '@/components/CategoryNav/categoryNav';
import { Grid, Pagination, Flex } from '@mantine/core';
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { productService } from '@/services/productService';
import {
  LoadingOverlay,
  Anchor,
  Breadcrumbs,
  Container,
  Group,
  Select,
  Divider,
} from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const RATING_DATA = [
  'Tất cả',
  'Một sao',
  'Hai sao',
  'Ba sao',
  'Bốn sao',
  'Năm sao',
];

const SORT_DATA = [
  'Giá cao nhất',
  'Giá thấp nhất',
  'Đánh giá cao nhất',
  'Đánh giá thấp nhất',
];

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  const id = searchParams.get('category') || '654272bffe4d153ff2b3078e';

  const products = useQuery({
    queryKey: ['products', id],
    queryFn: () => productService.getAllProductsByCategory(id),
  });

  const [selectedRating, setSelectedRating] = useState<string | null>('Tất cả');
  const [selectedSort, setSelectedSort] = useState<string | null>(
    'Giá cao nhất'
  );

  return (
    <Container fluid>
      <Breadcrumbs my={30}>
        <Link href='/' key={0}>
          Trang chủ
        </Link>
        <Link href={`/products?category=${id}`} key={1}>
          {searchParams.get('category')
            ? categories.data?.find(
                (category) => category._id == searchParams.get('category')
              )?.category_name
            : categories.data?.[0].category_name}
        </Link>
      </Breadcrumbs>
      <Grid w='100%'>
        <Grid.Col span={2}>
          {categories.isSuccess && <CategoryNav data={categories.data || []} />}
        </Grid.Col>
        <Grid.Col span={10}>
          <Group
            className='bg-white rounded-md'
            p={15}
            mb={10}
            justify='space-between'
          >
            <Group>
              <p className='text-[0.8rem]'>Thương hiệu</p>
              <Select
                w='6rem'
                size='xs'
                radius='md'
                allowDeselect={false}
                value={'Tất cả'}
                data={['Tất cả']}
              />
              <p className='text-[0.8rem]'>Đánh giá</p>
              <Select
                w='6rem'
                size='xs'
                radius='md'
                onChange={setSelectedRating}
                allowDeselect={false}
                value={selectedRating}
                data={RATING_DATA}
              />
            </Group>
            <Group>
              <Divider orientation='vertical' />
              <p className='text-[0.8rem]'>Sắp xếp</p>
              <Select
                w='9rem'
                size='xs'
                radius='xl'
                onChange={setSelectedSort}
                allowDeselect={false}
                value={selectedSort}
                data={SORT_DATA}
              />
            </Group>
          </Group>
          <Container fluid py={10} className='bg-white rounded'>
            <ProductCards
              data={products.data || []}
              selectedRating={selectedRating}
              selectedSort={selectedSort}
            />
            <Flex className='w-full items-center justify-center p-[10px]'>
              {/* <Pagination
                total={11}
                color='gray'
                withControls={false}
                className='text-black'
                style={{ color: 'black' }}
              /> */}
            </Flex>
          </Container>
        </Grid.Col>
        {(categories.isPending || products.isPending) && (
          <LoadingOverlay
            visible={true}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
        )}
      </Grid>
    </Container>
  );
}
