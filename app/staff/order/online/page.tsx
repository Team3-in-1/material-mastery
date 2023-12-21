'use client'
import CalendarInput from '@/components/CalendarInput/calendarInput'
import { chunk } from '@/utils/array'
import { ComboboxProps, Fieldset, Group, Pagination, ScrollArea, Select, Stack, Table, Checkbox, Text, LoadingOverlay, Button, Skeleton } from '@mantine/core'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { useQuery } from '@tanstack/react-query'
import OrderService from '@/services/orderService'
import TableSkeleton from '@/components/Skeleton/tableSkeleton'
import OrderTable from './orderTable'



const dates = ['Ngày', 'Tuần', 'Tháng', 'Quý', 'Năm']
const dateMapping = { 'Ngày': 'day', 'Tuần': 'week', 'Tháng': 'month', 'Quý': 'quarter', 'Năm': 'year' }

const paymentState = ['Tất cả', 'Đã thanh toán', 'Chưa thanh toán']
const shipmentState = [
    'Tất cả',
    'Chờ xác nhận',
    'Chuẩn bị hàng',
    'Đã hủy',
    'Đang giao',
    'Đã giao',
    'Giao thất bại'
]
const shipmentStatusMapping = {
    'Tất cả': '',
    'Chờ xác nhận': 'pending',
    'Chuẩn bị hàng': 'confirmed',
    'Đang giao': 'shipping',
    'Đã giao': 'shipped',
    'Đã hủy': 'cancelled',
    'Giao thất bại': 'failed',
}

const paymentStatusMapping = {
    'Tất cả': '',
    'Chưa thanh toán': 'pending',
    'Đã thanh toán': 'paid'
}




const comboboxStyles: ComboboxProps = { transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }
export default function OnlineOrderSegment() {
    const [activePage, setPage] = useState(1);
    // filter 
    const [date, setDate] = useState<string | null>(dates[0])
    const [paymentFilter, setPaymentFilter] = useState<string | null>(paymentState[0])
    const [shipmentFilter, setShipmentFilter] = useState<string | null>(shipmentState[0])
    const { user } = useContext(UserContext);
    const orders = useQuery({
        queryKey: ['orders', activePage, shipmentFilter],
        queryFn: () => {
            const orderService = new OrderService(user);
            return orderService.getAllOrder(
                10,
                activePage,
                shipmentStatusMapping[shipmentFilter as keyof typeof shipmentStatusMapping]);
        },
        enabled: !!user,
    });

    const numberOfOrder = useQuery({
        queryKey: ['numberOfOrder'],
        queryFn: () => {
            const orderService = new OrderService(user);
            return orderService.getNumberOfOrder()
        },
        enabled: !!user,
    });



    // const handleFilter = (data: any) => {
    //     return data.filter((item: any) => {
    //         if (paymentFilter === paymentState[0])
    //             return true
    //         else
    //             return item.order_payment.status === paymentStatusMapping[paymentFilter as keyof typeof paymentStatusMapping]
    //     })
    // }
    const calPages = (num: any) => {
        let total: number = num.pending + num.confirmed + num.cancelled + num.shipping + num.shipped + num.failed
        // total = total % 10 !== 0 ? Math.ceil(total / 10) : Math.floor(total / 10);
        return Math.ceil(total / 10)
    }

    return (
        <ScrollArea className='h-full w-full z-[0]' py='1rem' px='2rem'>
            <Stack className='flex flex-col gap-[16px]'>
                <Fieldset className='flex gap-[16px] items-end w-fit' legend="Bộ lọc">
                    {/* <Group gap='0.5rem'>
                        <Select
                            w='100'
                            data={dates}
                            value={date}
                            onChange={setDate}
                            rightSectionWidth={0}
                            comboboxProps={comboboxStyles}
                        />
                        <CalendarInput type={dateMapping[date as keyof typeof dateMapping]} />
                    </Group> */}
                    <Select
                        w='fit-content'
                        label='Trạng thái thanh toán'
                        data={paymentState}
                        value={paymentFilter}
                        onChange={setPaymentFilter}
                        comboboxProps={comboboxStyles}
                    />
                    <Select
                        w='fit-content'
                        label='Trạng thái giao hàng'
                        data={shipmentState}
                        value={shipmentFilter}
                        onChange={setShipmentFilter}
                        comboboxProps={comboboxStyles}
                    />
                </Fieldset>
                {orders.isPending || numberOfOrder.isPending ? (
                    <Skeleton mt='lg' height={500} radius="md" />
                ) :
                    <div className='flex flex-col border-[0.5px] border-solid rounded-[4px] w-full py-[12px] px-[16px]' >
                        <OrderTable orders={orders.data} />
                        <Pagination className='self-center' total={calPages(numberOfOrder.data)} value={activePage} onChange={setPage} mt="sm" />
                    </div>}
            </Stack>
        </ScrollArea>
    )
}
