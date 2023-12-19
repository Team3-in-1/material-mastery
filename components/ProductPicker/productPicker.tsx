'use client'
import queryClient from "@/helpers/client";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import { Category, Product } from "@/utils/response";
import { Image, ActionIcon, AspectRatio, Box, Button, Card, ComboboxProps, Divider, Flex, Group, Modal, ScrollArea, Select, Skeleton, Stack, Table, Text, TextInput, Badge } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { IconLayoutList, IconCategory, IconSearch } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";


function ProductSkeleton() {
    const skeletons = Array(4).fill(
        <Stack >
            <Skeleton h='150' w='200' radius='8px' animate />
            <Skeleton h='10' w='200' radius='8px' animate />
            <Skeleton h='10' w='100' radius='8px' animate />
        </Stack>
    )
    return (
        <Flex wrap='wrap' gap='16'>
            {skeletons}
        </Flex>
    )
}

function ProductCard({ data }: { data: Product | undefined }) {
    return (
        <Card shadow="sm" padding={0} radius="md" withBorder >
            <Card.Section display='flex' className="justify-center">
                <AspectRatio ratio={200 / 150} maw={200} className='w-[200px] border-b-[1px] border-gray-300 '>
                    <Image
                        alt='product'
                        src={data?.product_thumb}

                    />
                    {data?.product_quantity == 0 && (
                        <div className='flex w-full h-full absolute top-50 left-30 items-start justify-center bg-gray-200/80'>
                            <Badge>Hết hàng</Badge>
                        </div>
                    )}
                </AspectRatio>
            </Card.Section>
            <Stack p='4px' justify='space-between' h='100%'>
                <Text lineClamp={2} w='200' size='sm'>{data?.product_name}</Text>
                <Button variant='light'>Thêm</Button>
            </Stack>

        </Card>
    )
}

export default function ProductPicker({
    categories,
    label,
    variant
}: {
    categories: Category[] | undefined,
    label: string,
    variant: string
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [displayType, setDisplayType] = useState(['filled', 'default'])
    const [keyword, setKeyword] = useState('')
    const [searching, setSearching] = useState('sleeping')
    const [productData, setProductData] = useState<Product[]>()

    const searchMutation = useMutation({
        mutationKey: ['search', keyword],
        mutationFn: () => {
            return productService.search(keyword)
        },
        onSuccess: data => {
            if (data.length != 0) {
                setSearching('success')
                setProductData(data)
            }
            else setSearching('failed')
        }
    })

    const search = async () => {
        setSearching('pending')
        searchMutation.mutate()

    };

    const productsBySearch =
        <Flex wrap='wrap' gap='16'>
            {productData?.map(product => (
                <ProductCard data={product} />
            ))}
        </Flex>

    const categoryCards =
        <Flex wrap='wrap' gap='1rem'>
            {categories?.filter((i) => {
                if (keyword === '')
                    return true
                else
                    return i.category_name.toLowerCase().includes(keyword.toLowerCase())
            }).map(category => (
                <Button variant='default' >{category.category_name}</Button>
            ))
            }
        </Flex>

    const categoryList =
        <Table highlightOnHover highlightOnHoverColor='turquoise.0' verticalSpacing="sm">
            <Table.Tbody>
                {categories?.filter((i) => {
                    if (keyword === '')
                        return true
                    else
                        return i.category_name.toLowerCase().includes(keyword.toLowerCase())
                }).map(category => (
                    <Table.Tr
                        key={category._id}>
                        <Table.Td>{category.category_name}</Table.Td>
                    </Table.Tr>
                ))
                }
            </Table.Tbody>
        </Table>

    return (
        <>
            <Modal.Root size='auto' zIndex={10000} opened={opened} onClose={close}>

                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Header>
                        <Modal.Title><Text fw={700}>Chọn sản phẩm</Text></Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>

                    <Modal.Body w='800' >
                        <Group justify='space-between' mb='lg'>
                            <TextInput
                                className="basis-3/4"
                                placeholder='Tìm kiếm danh mục hoặc sản phẩm.'
                                value={keyword}
                                onChange={(event) => setKeyword(event.currentTarget.value)}
                                rightSection={
                                    <ActionIcon variant='white' color='gray'>
                                        <IconSearch
                                            onClick={() => {
                                                search();
                                            }}
                                            style={{ height: '1.5rem', width: '1.5rem' }}
                                        />
                                    </ActionIcon>
                                }
                            ></TextInput>
                            <ActionIcon.Group>
                                <ActionIcon variant={displayType[0]} size="lg" onClick={() => setDisplayType(['filled', 'default'])}>
                                    <IconCategory style={{ width: '32px' }} stroke={1.5} />
                                </ActionIcon>
                                <ActionIcon variant={displayType[1]} size="lg" onClick={() => setDisplayType(['default', 'filled'])}>
                                    <IconLayoutList style={{ width: '32px' }} stroke={1.5} />
                                </ActionIcon>
                            </ActionIcon.Group>
                        </Group>
                        <ScrollArea h='450'>
                            {displayType[0] === 'filled' ? categoryCards : categoryList}
                            <Divider my='32px' />
                            {(() => {
                                switch (searching) {
                                    case 'sleeping':
                                        return <></>
                                    case 'pending':
                                        return <ProductSkeleton />
                                    case 'success':
                                        return productsBySearch
                                    case 'failed':
                                        return <p className="mt-[24px]">Không tìm thấy</p>
                                    default:
                                        return <></>
                                }
                            })()}
                        </ScrollArea>
                    </Modal.Body>

                </Modal.Content>

            </Modal.Root >
            <Button variant={variant} onClick={open}>{label}</Button>
        </>
    );
}
