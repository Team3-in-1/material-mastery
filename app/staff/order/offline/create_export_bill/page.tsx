'use client'
import BillProduct from "@/components/BillProduct/billProduct";
import ProductPicker from "@/components/ProductPicker/productPicker";
import { categoryService } from "@/services/categoryService";
import { Bill_Product } from "@/utils/object";
import { Product } from "@/utils/response";
import { ActionIcon, Button, Flex, Group, Modal, NativeSelect, ScrollArea, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowLeft, IconMapPin, IconMapPinFilled, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function CreateExportBillPage() {
    const router = useRouter()
    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getAllCategories,
        staleTime: Infinity,
        gcTime: Infinity,
    });
    const [opened, { open, close }] = useDisclosure(false);

    const [addedProduct, setAddedProduct] = useState<Bill_Product[]>([])
    const [quantity, setQuantity] = useState<number[]>([])
    const [maximum, setMaximum] = useState<number[]>([])

    const AddedProduct = addedProduct.map((item, index) => (
        <BillProduct order={index} refQuantity={quantity} refSetQuantity={setQuantity} />
    ))

    const handleChooseProduct = (data: Product) => {
        let billProduct: Bill_Product = {
            _id: data._id,
            product_category: data.product_categories[0].category_name,
            product_name: data.product_name,
            quantity: 1,
            product_price: data.product_price,
            product_unit: data.product_unit,
            totalPrice: data.product_price
        }
        setQuantity([...quantity, 1])
        setAddedProduct([...addedProduct, billProduct])
        setMaximum([...maximum, data.product_quantity])
    }
    return (
        <ScrollArea className='h-full w-full z-[0]' >
            <div className='flex flex-col gap-[24px] py-[16px] px-[16px]'>
                <ActionIcon variant="light" size='lg' aria-label="Back to Order page"
                    onClick={() => router.back()}><IconArrowLeft /></ActionIcon>
                <Group justify="space-between" >
                    <Stack gap='0' px='32px'>
                        <Title order={2} mb='4'>Phiếu xuất hàng</Title>
                        <Text fs='italic' size='sm'>*Tạo phiếu khi khách đặt đơn tại cửa hàng</Text>
                    </Stack>
                    <Button.Group>
                        <Button variant='outline'>Xóa phiếu</Button>
                        <Button>Tạo phiếu</Button>
                    </Button.Group>
                </Group>
                <Flex className="rounded-[8px] border-[1px] " p='16'>
                    <Stack w='250'>
                        <TextInput
                            label="Tên khách hàng"
                            placeholder="VD: Nguyễn Văn Material"
                            withAsterisk
                        />
                        <Textarea
                            label="Địa chỉ kho đi"
                            placeholder="VD: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Thành phố Hồ Chí Minh"
                            withAsterisk
                            autosize
                        />
                        <Textarea
                            label="Địa chỉ nhận"
                            placeholder="VD: làng Địa Ngục, xã Vần Chải, huyện Đồng Văn, tỉnh Hà Giang"
                            withAsterisk
                        />
                        <TextInput
                            label="Số điện thoại"
                            placeholder="VD: 0123456789"
                            withAsterisk
                        />

                        <NativeSelect
                            label="Hình thức thanh toán"
                            data={['Tiền mặt', 'Quẹt thẻ']}
                            withAsterisk
                        />
                    </Stack>
                    <Stack p='16'>
                        {AddedProduct}
                        <ProductPicker categories={categories.data} label="Thêm sản phẩm" onChoose={handleChooseProduct} />
                        <Button onClick={() => console.log(quantity)}>in</Button>
                    </Stack>
                </Flex>

            </div>
        </ScrollArea>
    )
}
