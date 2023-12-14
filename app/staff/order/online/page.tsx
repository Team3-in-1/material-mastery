'use client'
import CalendarInput from '@/components/CalendarInput/calendarInput'
import { chunk } from '@/utils/array'
import { ComboboxProps, Fieldset, Group, Pagination, ScrollArea, Select, Stack, Table, Checkbox, Text } from '@mantine/core'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'


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

const tableHeadList = [
    'Mã đơn hàng', 'Ngày tạo', 'Khách hàng', 'Thanh toán', 'Giao hàng', 'Tổng tiền'
]
const tableHeadMapping = {
    'id': 'Mã đơn hàng',
    'createAt': 'Ngày tạo',
    'customer': 'Khách hàng',
    'paymentStatus': 'Thanh toán',
    'shipmentStatus': 'Giao hàng',
    'total': 'Tổng tiền'
}

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

    let currentPath = usePathname()
    const router = useRouter()
    const [date, setDate] = useState<string | null>(dates[0])
    const [activePage, setPage] = useState(1);
    // const [pa]
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectAllRow, setSelectAllRow] = useState(false)
    const tableHead = tableHeadList.map(i => (
        <Table.Th key={i}>{i}</Table.Th>
    ))

    const tableBody = mockData[activePage - 1].map((i) => (
        <Table.Tr
            key={i.id}
            bg={selectedRows.includes(i.id) ? 'var(--mantine-color-turquoise-light)' : undefined}
        >

            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(i.id)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, i.id]
                                : selectedRows.filter((position) => position !== i.id)
                        )
                    }
                />
            </Table.Td>
            <Table.Td>{i.id}</Table.Td>
            <Table.Td>{i.createAt}</Table.Td>
            <Table.Td>{i.customer}</Table.Td>
            <Table.Td>{i.paymentStatus}</Table.Td>
            <Table.Td>{i.shipmentStatus}</Table.Td>
            <Table.Td>{i.total}</Table.Td>
            <Table.Td className='cursor-pointer' onClick={() => router.push(`${currentPath}/${i.id}`)}>
                <Text c='turquoise' >Xem</Text>
            </Table.Td>
        </Table.Tr>

    ))
    return (
        <ScrollArea className='h-full w-full z-[0]' py='1rem' px='2rem'>
            <Stack className='flex flex-col gap-[16px]'>
                <Fieldset className='flex gap-[16px] items-end w-fit' legend="Bộ lọc">
                    <Group gap='0.5rem'>
                        <Select
                            w='100'
                            data={dates}
                            value={date}
                            onChange={setDate}
                            rightSectionWidth={0}
                            comboboxProps={comboboxStyles}
                        />
                        <CalendarInput type={dateMapping[date as keyof typeof dateMapping]} />
                    </Group>
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
                <div className='flex flex-col border-[0.5px] border-solid rounded-[4px] w-full py-[12px] px-[16px]' >
                    <Table verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr key='head'>
                                <Table.Th>
                                    <Checkbox
                                        checked={selectAllRow}
                                        onChange={(event) => {
                                            setSelectAllRow(event.currentTarget.checked)
                                            setSelectedRows(
                                                event.currentTarget.checked
                                                    ? arr.map(i => (i.id)) :
                                                    [])
                                        }
                                        }
                                    />
                                </Table.Th>
                                {tableHead}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {tableBody}
                        </Table.Tbody>
                    </Table>
                    <Pagination className='self-center' total={mockData.length} value={activePage} onChange={setPage} mt="sm" />
                </div>
            </Stack>
        </ScrollArea>
    )
}
