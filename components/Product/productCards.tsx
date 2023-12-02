'use client';
import { Grid } from '@mantine/core';
import { PCard } from './pcard';
import { Product } from '@/utils/response';

export const ProductCards = ({ data }: { data: Product[] }) => {
  return (
    <Grid w='100%' columns={15}>
      {data.map((item: Product) => (
        <Grid.Col key={item._id} span={{ base: 15, md: 5, lg: 3, sm: 15 }}>
          <PCard data={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
