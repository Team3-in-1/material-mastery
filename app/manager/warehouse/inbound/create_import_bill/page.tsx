import ProductPicker from '@/components/ProductPicker/productPicker'
import { categoryService } from '@/services/categoryService';
import { Button, Group, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function page() {

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getAllCategories,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal.Root size='auto' zIndex={10000} opened={opened} onClose={close} centered>
                <Modal.Overlay />
                <Modal.Content >
                    <Modal.Header>
                        <Modal.Title w='100%' ta='center'><Text fw={700}>Thêm sản phẩm</Text></Modal.Title>
                        <Modal.CloseButton />
                    </Modal.Header>
                    <Modal.Body >
                        <Group align="flex-start">
                            <ProductPicker categories={categories.data} label="Chọn sản phẩm có sẵn" type='square' />
                            <UnstyledButton
                                style={{
                                    border: '1px solid #02B1AB'
                                }}
                                className="rounded-[8px] "
                                onClick={open}
                                h='150'
                                w='180'
                                // bg='turquoise.0'
                                ta='center'
                                p='lg'
                                c='turquoise'
                                fw='bold'
                            ><IconPlus width='100%' display='inline-block' />Sản phẩm mới</UnstyledButton>
                        </Group>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>
            <Button variant='filled' onClick={open}>Thêm</Button>
        </>
    )
}
