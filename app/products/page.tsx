'use client';

import { ProductCards } from '@/components/Product/productCards';
import { CategoryNav } from '@/components/CategoryNav/categoryNav';
import '../global.css';
import { Grid, Pagination, Flex } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories,
  });

  const id = searchParams.get('category') || '654272bffe4d153ff2b3078e';

  console.log(id);

  const products = useQuery({
    queryKey: ['products', id],
    queryFn: () => productService.getAllProductsByCategory(id),
  });

  return (
    <Container fluid>
      <Breadcrumbs my={30}>
        <Anchor href='/' key={0}>
          Trang chủ
        </Anchor>
        <Anchor key={1}>
          {searchParams.get('category')
            ? categories.data?.find(
                (category) => category._id == searchParams.get('category')
              )?.category_name
            : categories.data?.[0].category_name}
        </Anchor>
      </Breadcrumbs>
      <Grid w='100%'>
        <Grid.Col span={2}>
          {categories.isSuccess && <CategoryNav data={categories.data || []} />}
        </Grid.Col>
        <Grid.Col span={10}>
          <Group
            className='bg-white rounded-md'
            p={15}
            my={10}
            justify='space-between'
          >
            <Group>
              <p className='text-[0.8rem]'>Thương hiệu</p>
              <Select
                w='6rem'
                size='xs'
                radius='md'
                value={'Tất cả'}
                data={['Tất cả', 'Angular', 'Vue', 'Svelte']}
              />
              <p className='text-[0.8rem]'>Đánh giá</p>
              <Select
                w='6rem'
                size='xs'
                radius='md'
                value={'Tất cả'}
                data={['Tất cả', 'Angular', 'Vue', 'Svelte']}
              />
            </Group>
            <Group>
              <Divider orientation='vertical' />
              <p className='text-[0.8rem]'>Sắp xếp</p>
              <Select
                w='8rem'
                size='xs'
                radius='xl'
                value={'Tất cả'}
                data={['Tất cả', 'Angular', 'Vue', 'Svelte']}
              />
            </Group>
          </Group>
          <Container fluid py={10} className='bg-white rounded'>
            <ProductCards data={products.data || []} />
            <Flex className='w-full items-center justify-center p-[10px]'>
              <Pagination
                total={10}
                color='cyan'
                withControls={false}
                className='text-black'
              />
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
