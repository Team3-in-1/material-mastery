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
    queryFn: () => categoryService.getAllCategories(JSON.parse(localStorage.getItem('user') || '').tokenPair.accessToken)
  })

  return (
    // <div
    //   style={{
    //     minHeight: "100vh",
    //     position: "relative",
    //     width: "100%",
    //     height: "fit-content",
    //     zIndex: 1,
    //     backgroundColor: "var(--mantine-color-gray-1)",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     // boxShadow: 'var(--mantine-shadow-md)'
    //   }}
    // >
    //   <Link href="/categories/brick">Products</Link>
    // </div>

    <Container mt={80} px={50} pt={20} fluid mih='100vh' pos='relative' style={{
      backgroundColor: "var(--mantine-color-gray-1)",
      'zIndex': 1
    }}>
      <Grid w='100%'>
        <Grid.Col span={2}>
          <Stack bg='#fff' gap='xs' p={20} style={{
            textAlign: 'center',
            borderRadius: '10px',
          }}>
            <Text size='md' pt={10}>Trang chủ</Text>
            <Divider/>
            {
              categories.isSuccess && categories.data.map((category) => (
                <Link key={category._id} href="/categories/brick" style={{
                  color: '#8E8E8E',
                  padding: '20px',
                  fontSize: '13px'
                }}>
                  {category.category_name}
                </Link>
              ))
            }
          </Stack>
        </Grid.Col>
        <Grid.Col span={10}>
          <Image component={NextImage} radius='md' src={banner} alt='banner' />
        </Grid.Col>
      </Grid>
      {categories.isPending && <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />}
    </Container>
  );
}
