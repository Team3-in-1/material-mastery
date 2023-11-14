'use client'
import Link from "next/link";
import { Grid, Container, Stack, Text, Divider, Image, LoadingOverlay } from "@mantine/core";
import banner from '@/public/pic/banner.png'
import NextImage from "next/image"
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";

export default function Home() {

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAllCategories
  })

  return (
    <Container mt={70} px={50} py={30} fluid mih='100vh' pos='relative' style={{
      backgroundColor: "var(--mantine-color-gray-1)",
      'zIndex': 1
    }}>
      <Grid w='100%'>
        <Grid.Col span={2}>
          <Stack bg='#fff' gap='xs' p={20} style={{
            textAlign: 'center',
            borderRadius: '1rem'
          }}>
            <Text size='md' pt={10}>Trang chủ</Text>
            <Divider />
            {
              categories.isSuccess && categories.data.map(category => (
                <Link key={category._id} href={`/products?category=${category._id}`} style={{
                  color: '#8E8E8E',
                  padding: '8px',
                  fontSize: '13px',
                  textDecoration: 'none'
                }} >
                  {category.category_name}
                </Link>
              ))
            }
          </Stack>
        </Grid.Col>
        <Grid.Col span={10}>
          <Image component={NextImage} radius='md' src={banner} alt='banner' w='71.75rem' h='20.438rem'/>
        </Grid.Col>
      </Grid>
      {categories.isPending && <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />}
    </Container>
  )
}
