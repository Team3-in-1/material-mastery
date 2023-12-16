'use client'
import { ActionIcon, Button, Flex, ScrollArea, Skeleton, Stepper, Text } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';
import { useQuery } from '@tanstack/react-query'
import OrderService from '@/services/orderService'
import Loading from './loading';
import { useRouter } from 'next/navigation';





enum statusOrder { 'pending' = 0, 'cancelled' = 2, 'confirmed' = 1, 'shipping' = 2, 'shipped' = 4, 'failed' = 4 }
export default function OrderDetailsForStaffPage({ params }: { params: { order_id: string } }) {

    const router = useRouter()
    const { user } = useContext(UserContext);
    const target_order = useQuery({
        queryKey: ['target_order', params.order_id],
        queryFn: () => {
            const orderService = new OrderService(user);
            return orderService.getOrderById(params.order_id);
        },
        enabled: !!user,
    })

    const [active, setActive] = useState(0);
    const [isCancel, setIsCancel] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        if (target_order.data !== undefined) {

            let stat: string = target_order.data.order_status
            setActive(statusOrder[stat as keyof typeof statusOrder])
            console.log(stat)
            if (stat === 'cancelled')
                setIsCancel(true)
            else
                if (stat === 'failed') {
                    setIsSuccess(false)
                    setIsCancel(false)
                }
                else
                    setIsCancel(false)

        }

    }, [target_order])

    const stepped_cancelled =
        <Stepper color='red' active={active} onStepClick={undefined} px='1rem' w='600'>
            <Stepper.Step label="Xác nhận" description="Xác nhận đơn hàng">
                <Flex >
                    <Flex className='rounded-[0.5rem] border-[0.5px] px-[1rem] py-[0.5rem]'>
                        <Text fw={700} >Thông tin sản phẩm</Text>
                    </Flex>
                    <Flex >
                        <Text >Địa chỉ giao hàng</Text>
                    </Flex>
                </Flex>
            </Stepper.Step>
            <Stepper.Step label="Hủy đơn" description="Đơn hàng bị hủy bởi khách hàng" >
                jztr
            </Stepper.Step>
        </Stepper>

    const stepped =
        <Stepper color={isSuccess ? 'turquoise' : 'red'} active={active} onStepClick={undefined} px='1rem'>
            <Stepper.Step label="Xác nhận" description="Xác nhận đơn hàng">
                <Flex >
                    <Flex className='rounded-[0.5rem] border-[0.5px] px-[1rem] py-[0.5rem]'>
                        <Text fw={700} >Thông tin sản phẩm</Text>
                    </Flex>
                    <Flex >
                        <Text >Địa chỉ giao hàng</Text>
                    </Flex>
                </Flex>
            </Stepper.Step>
            <Stepper.Step label="Chuẩn bị hàng" description="Nhân viên chuẩn bị hàng"></Stepper.Step>
            <Stepper.Step label="Giao hàng" description="Giao hàng cho người mua"></Stepper.Step>
            {isSuccess ?
                <Stepper.Step label="Giao thành công" description="Giao hàng thành công"></Stepper.Step> :
                <Stepper.Step label="Giao thất bại" description="Giao hàng thất bại"></Stepper.Step>
            }
        </Stepper>

    return (
        <ScrollArea className='h-full w-full z-[0]' >
            {target_order.isPending ?
                (
                    <Loading />
                ) :
                (
                    <div className='flex flex-col gap-[24px] py-[16px] px-[16px]'>
                        <ActionIcon variant="light" size='lg' aria-label="Back to Order page"
                            onClick={() => router.back()}><IconArrowLeft /></ActionIcon>
                        {isCancel ? stepped_cancelled : stepped}
                    </div>
                )}
        </ScrollArea>
    )
}
