'use client'
import { useEffect, useState } from 'react'
import { Stack, NavLink, Group } from '@mantine/core'
import { useRouter, usePathname } from 'next/navigation'
import { IconLayoutDashboard, IconBuildingWarehouse, IconChecklist } from '@tabler/icons-react'

const staffData = [
    {
        slug: 'dashboard',
        icon: IconLayoutDashboard,
        label: 'Bảng điều khiển',
        child: [
            {
                slug: 'revenue',
                label: 'Doanh thu'
            },
            {
                slug: 'in-outbound',
                label: 'Nhập/Xuất kho'
            },
        ]
    },
    {
        slug: 'warehouse',
        icon: IconBuildingWarehouse,
        label: 'Kho',
        child: []
    },
    {
        slug: 'order',
        icon: IconChecklist,
        label: 'Đơn hàng',
        child: [
            {
                slug: 'online',
                label: 'Trực tuyến'
            },
            {
                slug: 'offline',
                label: 'Tại cửa hàng'
            },
        ]
    },
];
const adminData = [
    {
        slug: 'dashboard',
        icon: IconLayoutDashboard,
        label: 'Bảng điều khiển',
        child: [
            {
                slug: 'revenue',
                label: 'Doanh thu'
            },
            {
                slug: 'in-outbound',
                label: 'Nhập/Xuất kho'
            },
        ]
    },
    {
        slug: 'warehouse',
        icon: IconBuildingWarehouse,
        label: 'Kho',
        child: []
    },
    {
        slug: 'order',
        icon: IconChecklist,
        label: 'Đơn hàng',
        child: [
            {
                slug: 'online',
                label: 'Trực tuyến'
            },
            {
                slug: 'offline',
                label: 'Tại cửa hàng'
            },
        ]
    },
];


export default function SideBar({ from }: { from: string }) {
    const router = useRouter()
    let currentUrl = usePathname()
    const [active, setActive] = useState(
        currentUrl.split('/').filter(Boolean)
    )
    useEffect(() => {
        setActive(currentUrl.split('/').filter(Boolean))
    }, [currentUrl])

    const handleOnclick = (item: any, childIndex?: any) => {
        const targetSlug = (item.child.length === 0) ? [item.slug] : [item.slug, item.child[childIndex | 0].slug]
        const href = (targetSlug.length > 1) ? `/${targetSlug[1]}` : ''
        router.push(`/${active[0]}/${targetSlug[0]}` + href)
    };

    const data = (from === 'staff') ? staffData : adminData

    const items = data.map((item) => (
        <NavLink
            key={item.label}
            active={item.slug === active[1]}
            variant={(item.child.length === 0) ? 'light' : 'subtle'}
            label={item.label}
            leftSection={<item.icon size='1rem' stroke={1.5} />}
            className='rounded-[8px]'
            onClick={() => handleOnclick(item)}
            rightSection={<></>}
            opened={item.slug === active[1]}
            childrenOffset={0}
            w='180px'
            my='4px'
            px='1rem'
            py='0.8rem'
        >
            <Stack>
                {item.child.map((child, index) => (
                    <NavLink
                        key={child.label}
                        active={child.slug === active[2]}
                        label={child.label}
                        onClick={() => handleOnclick(item, index)}
                        w='180px'
                        ta='end'
                    />
                ))}
            </Stack>
        </NavLink>
    ));

    return (
        <Stack py='2rem' px='1rem' bg='white' gap='0' className='shadow-[0px_0px_4px_0px_rgba(0,0,0,0.2)] z-[1] h-[100%]'>
            {items}
        </Stack>
    );
};

