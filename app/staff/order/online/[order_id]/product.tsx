import { formatMoney } from '@/utils/string';
import { Flex, Group, Image, Loader, Stack, Text } from '@mantine/core';
import logo from '@/public/icon.svg';
import NextImage from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

const Product = ({
    productId,
    quantity,
    priceRaw,
}: {
    productId: string;
    quantity: number;
    priceRaw: number;
}) => {
    const productData = useQuery({
        queryKey: ['productData', productId],
        queryFn: () => {
            return productService.getProductById(productId);
        },
        staleTime: Infinity,
    });
    if (productData.isPending) {
        return <Loader color='#02B1AB' size={10} />;
    }
    return (
        <Group className=' items-center justify-between w-full'>
            <Group className=' justify-start items-center'>
                <Flex className='w-[50px] h-fit justify-center items-center'>
                    <Image
                        src={productData.data?.product_thumb}
                        className=' w-auto h-[30px]'
                    />
                </Flex>
                <Text>{productData.data?.product_name}</Text>
                <Text>{`x${quantity}`}</Text>
            </Group>
            <Group className='gap-0'>
                <Text>{formatMoney(priceRaw)}</Text>
                <Text>đ</Text>
            </Group>
        </Group>
    );
};

export default Product;
