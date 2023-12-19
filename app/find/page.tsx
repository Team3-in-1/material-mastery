'use client';
import '@/styles/global.css';
import queryClient from '@/helpers/client';
import { productService } from '@/services/productService';
import { ActionIcon, Grid, LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { PCard } from '@/components/Product/pcard';
import { IconArrowNarrowLeft } from '@tabler/icons-react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyWord = searchParams.get('key') || '';
  const router = useRouter();
  const search = useQuery({
    queryKey: ['search', keyWord],
    queryFn: () => {
      return productService.search(keyWord);
    },
  });
  if (search.isPending) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    );
  }
  return (
    <Grid className='relative z-[1] bg-[#f1f3f5] min-h-full w-full h-fit mt-[100px] mb-[30px] px-[100px] overflow-hidden pb-[30px]'>
      <ActionIcon className=' absolute top-[8px] left-[50px] h-[30px] cursor-pointer'>
        <IconArrowNarrowLeft
          color='#02B1AB'
          onClick={() => {
            router.back();
          }}
        />
      </ActionIcon>
      {search.data.map((product: any, index: number) => {
        return (
          <Grid.Col span={2} key={index}>
            <PCard data={product} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default SearchPage;
