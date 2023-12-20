'use client'
import UserContext from "@/contexts/UserContext";
import queryClient from "@/helpers/client";
import BillService from "@/services/billService";
import { Button, Group, Pagination, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ExportBillTable from "./exportBillTable";


export default function OfflineOrderSegment() {

    // some inner constant var
    // --start--
    const numOfBillInDisplay: number = 10
    // --end-- 

    const router = useRouter()
    const currentPath = usePathname()
    const { user } = useContext(UserContext)
    const [activePage, setPage] = useState(1)
    const bills = useQuery({
        queryKey: ['bills', activePage],
        queryFn: () => {
            const billService = new BillService(user)
            return billService.getAllExportBill(numOfBillInDisplay, activePage)
        },
        enabled: !!user,
    })

    const numberOfBill = useQuery({
        queryKey: ['number_of_bill'],
        queryFn: () => {
            const billService = new BillService(user)
            return billService.getNumberOfBill()
        },
        enabled: !!user,
    })

    const calPages = (num: any) => {
        return Math.ceil(num / numOfBillInDisplay)
    }
    return (
        <Stack w='100%' h='100%' py='1rem' px='2rem' justify='flex-start'>
            <Group justify="space-between">
                <Title order={4}>Danh sách phiếu xuất kho</Title>
                <Button onClick={() => { router.push(`${currentPath}/create_export_bill`) }}>Tạo phiếu</Button>
            </Group>
            <div className='flex flex-col border-[0.5px] border-solid rounded-[4px] w-full py-[12px] px-[16px]' >
                <ExportBillTable bills={bills.data} />
                <Pagination className='self-center' total={calPages(numberOfBill.data?.export)} value={activePage} onChange={setPage} mt="sm" />
            </div>
        </Stack >
    )
}
