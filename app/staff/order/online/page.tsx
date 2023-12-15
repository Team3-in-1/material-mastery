'use client'
import CalendarInput from '@/components/CalendarInput/calendarInput'
import { chunk } from '@/utils/array'
import { ComboboxProps, Fieldset, Group, Pagination, ScrollArea, Select, Stack, Table, Checkbox, Text, LoadingOverlay, Button } from '@mantine/core'
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

const paymentState = ['Đã thanh toán', 'Chưa thanh toán']
const shipmentState = [
    'Chưa thanh toán',
    'Đang chuẩn bị hàng',
    'Đã hủy',
    'Đang giao',
    'Giao thành công',
    'Giao thất bại'
]



const arr = Array(100)
    .fill(0)
    .map((_, index) => (
        {
            id: index,
            createAt: '27/12/2023',
            customer: 'Khai khai',
            paymentStatus: 0,
            shipmentStatus: 1,
            total: 100900,
        }
    ))
const mockData = chunk(
    arr,
    10
);

const comboboxStyles: ComboboxProps = { transitionProps: { transition: 'pop', duration: 200 }, shadow: 'md' }
export default function OnlineOrderSegment() {
    const [activePage, setPage] = useState(1);

    const { user } = useContext(UserContext);
    const orders = useQuery({
        queryKey: ['orders', activePage],
        queryFn: () => {
            const orderService = new OrderService(user);
            return orderService.getAllOrder(10, activePage);
        },
        enabled: !!user,
    });


    const [date, setDate] = useState<string | null>(dates[0])

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
                        defaultValue={paymentState[0]}
                        comboboxProps={comboboxStyles}
                    />
                    <Select
                        w='fit-content'
                        label='Trạng thái giao hàng'
                        data={shipmentState}
                        defaultValue={shipmentState[0]}
                        comboboxProps={comboboxStyles}
                    />
                </Fieldset>
                {orders.isPending ? (
                    <TableSkeleton col={8} row={10} />
                ) :
                    <div className='flex flex-col border-[0.5px] border-solid rounded-[4px] w-full py-[12px] px-[16px]' >
                        <OrderTable orders={orders.data} />
                        <Pagination className='self-center' total={2} value={activePage} onChange={setPage} mt="sm" />
                    </div>}
            </Stack>
        </ScrollArea>
    )
}
