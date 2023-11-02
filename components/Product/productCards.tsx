"use client";
import { Grid } from "@mantine/core";
import { PCard } from "./pcard";
import styles from "./pcard.module.css";

export const ProductCards = ({ data }: any) => {
  return (
    <Grid className={`${styles.container}`}>
      {data.map((item: any) => (
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <PCard></PCard>
        </Grid.Col>
      ))}
    </Grid>
  );
};
