
import { Product } from "@/utils/response";
import { Button, Divider, Group, NumberInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { formatMoney, formatProductId } from "@/utils/string";
import dayjs from "dayjs";
import { Bill_Product } from "@/utils/object";
import { useState } from "react";

const mockData: Bill_Product = {
    _id: "655f10ef4bf37f313fb9552e",
    product_name: "1/2\ x 4' x 8' Drywall Panel",
    product_price: 400000,
    quantity: 1,
    product_unit: "Panel",
    product_category: "Drywall",
    totalPrice: 100000
}

function ProductInfo({
    label,
    content
}: {
    label: string, content: any
}) {
    return (
        <Stack gap='0' w='150'>
            <Text fw={700} size='sm' c='dimmed'>{label}</Text>
            <Text >{content}</Text>
        </Stack>
    )
}
export default function BillProduct({
    data = mockData,
    order,
    max = 10,
    refQuantity,
    refSetQuantity
}: {
    data?: Bill_Product,
    order: number,
    max?: number,
    refQuantity: number[] | string[],
    refSetQuantity: any
}) {
    const [resData, setResData] = useState(data)
    const [quantity, setQuantity] = useState<number | string>(1)

    return (
        <Stack key={resData._id} w='fit-content' className="rounded-[8px] border-[1px]" p='16'>
            <Group>
                <Title order={5} c='orange.8' bg='orange.0' px='8' py='4'>Mặt hàng {order}</Title>
                <Group>
                    <Text fw={700} size='sm' c='dimmed'>Mã mặt hàng</Text>
                    <Text c='turquoise'>{formatProductId(resData._id, resData.product_price.toString())}</Text>
                </Group>
            </Group>
            <Divider />
            <Group align="flex-center">
                <ProductInfo label='Loại vật liệu' content={resData.product_category} />
                <ProductInfo label='Tên vật liệu' content={resData.product_name} />
                <Stack gap='0' w='150'>
                    <Text fw={700} size='sm' c='dimmed'>Số lượng</Text>
                    <NumberInput
                        aria-label="My input"
                        value={quantity}
                        onChange={(value) => {
                            setQuantity(value)
                            const tmp = refQuantity
                            tmp[order] = value
                            refSetQuantity(tmp)
                        }}
                        allowNegative={false}
                        clampBehavior="strict"
                        min={1}
                        max={max} />
                </Stack>
            </Group>
            <Group align="flex-center">
                <ProductInfo label='Đơn vị tính' content={resData.product_unit} />
                <ProductInfo label='Đơn giá' content={`${formatMoney(resData.product_price)} đ`} />
                <ProductInfo label='Thành tiền' content={`${formatMoney(resData.totalPrice)} đ`} />
            </Group>
        </Stack>
    )
}
