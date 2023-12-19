'use client'
import { Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function OfflineOrderSegment() {
    const currentPath = usePathname()

    return (
        <Button component={Link} href={`${currentPath}/create_export_bill`}>Tạo phiếu</Button>
    )
}
