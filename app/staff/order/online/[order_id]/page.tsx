'use client'
import { Flex, ScrollArea, Stepper, Text } from '@mantine/core'
import React, { useState } from 'react'

export default function page() {
    const [active, setActive] = useState(0);
    return (
        <ScrollArea className='h-full w-full z-[0]' py='1rem' px='2rem'>
            <Stepper active={active} onStepClick={undefined}>
                <Stepper.Step label="First step" description="Create an account">
                    <Flex >
                        <Flex >
                            <Text >Thông tin sản phẩm</Text>
                        </Flex>
                        <Flex >
                            <Text >Địa chỉ giao hàng</Text>
                        </Flex>
                    </Flex>
                </Stepper.Step>
                <Stepper.Step label="First step" description="Create an account"></Stepper.Step>
                <Stepper.Step label="First step" description="Create an account"></Stepper.Step>
            </Stepper>
        </ScrollArea>
    )
}
