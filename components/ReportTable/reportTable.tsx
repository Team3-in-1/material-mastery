'use client'
import { Button, Flex, Pagination, Table, Text } from '@mantine/core'
import { useState } from 'react';

function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

const mockData = chunk(
    Array(30)
        .fill(0)
        .map((_, index) => ({ id: index, name: 'kjdjsdk' })),
    5
);

type Props = {
    data?: Object[]
}
export default function ReportTable({ data }: Props) {
    const [activePage, setPage] = useState(1);
    const items = mockData[activePage - 1].map((item) => (
        <Table.Tr>
            <Table.Td>{item.id}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
        </Table.Tr>

    ));
    return (
        <Flex direction='column' align='end' >
            <Button>Xuất file</Button>
            <div className='border-[0.5px] border-solid rounded-lg w-full py-[12px] px-[16px]' >
                <Table >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Id</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {items}
                    </Table.Tbody>
                </Table>
            </div>
            <Pagination total={mockData.length} value={activePage} onChange={setPage} mt="sm" />
        </Flex>
    )
}
