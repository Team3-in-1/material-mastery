'use client'

import { ProductCards } from "@/components/Product/productCards";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import "../global.css";
import { Grid } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { categoryService } from "@/services/categoryService"
import { productService } from "@/services/productService";
import { LoadingOverlay, Anchor, Breadcrumbs, Container } from '@mantine/core'
import { useSearchParams } from 'next/navigation'

export default function ProductsPage() {

	const searchParams = useSearchParams()

	const queryClient = useQueryClient()

	const categories = useQuery({
		queryKey: ['categories'],
		queryFn: categoryService.getAllCategories
	})

	const products = useQuery({
		queryKey: ['products'],
		queryFn: productService.getAllProducts
	})

	return (
		<Container fluid>
			<Breadcrumbs my={30}>
				<Anchor href='/' key={0}>
					Trang chủ
				</Anchor>
				<Anchor key={1}>
					{searchParams.get('category') ?
						categories.data?.find(category => category._id == searchParams.get('category'))?.category_name
						: categories.data?.[0].category_name}
				</Anchor>
			</Breadcrumbs>
			<Grid w='100%'>
				<Grid.Col span={2}>
					{
						categories.isSuccess &&
						<CategoryNav
							data={categories.data || []}
						/>
					}
				</Grid.Col>
				<Grid.Col span={10}>
					<ProductCards data={products.data || []} />
				</Grid.Col>
				{(categories.isPending || products.isPending)
					&& <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />}
			</Grid>
		</Container>
	)
}
