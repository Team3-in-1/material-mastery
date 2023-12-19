
import { Product } from "@/utils/response";
import { Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { formatMoney, formatProductId } from "@/utils/string";
import dayjs from "dayjs";
import { Bill_Product } from "@/utils/object";

const mockData: Bill_Product = {
    _id: "655f10ef4bf37f313fb9552e",
    product_name: "test22222",
    product_price: 400000,
    quantity: 13,
    product_unit: "Panel",
    product_category: "Drywall",
    totalPrice: 100000

}
export default function BillProduct({
    data = mockData,
    order
}: {
    data?: Bill_Product,
    order: number,
}) {
    return (
        <Stack key={data._id} w='fit-content' className="rounded-[8px] border-[1px]" p='16'>
            <Group>
                <Title order={4} c='orange.8' bg='orange.0' px='8' py='4'>Mặt hàng {order}</Title>
                <Group>
                    <Text fw={700}>Mã vật liệu</Text>
                    <Text c='turquoise'>{formatProductId(data._id)}</Text>
                </Group>
            </Group>
            <Group>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Loại vật liệu</Text>
                    <Text>{data.product_category}</Text>
                </Stack>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Tên vật liệu</Text>
                    <Text>{data.product_name}</Text>
                </Stack>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Số lượng</Text>
                    <Text>{data.quantity}</Text>
                </Stack>
            </Group>
            <Group>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Đơn vị tính</Text>
                    <Text>{data.product_unit}</Text>
                </Stack>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Đơn giá</Text>
                    <Text>{formatMoney(data.product_price)} đ</Text>
                </Stack>
                <Stack gap='0' w='150'>
                    <Text fw={700}>Thành tiền</Text>
                    <Text>{formatMoney(data.totalPrice)} đ</Text>
                </Stack>
            </Group>
        </Stack>
    )
}
