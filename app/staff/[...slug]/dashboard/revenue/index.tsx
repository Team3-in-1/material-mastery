'use client'
import { Box, Button, Flex, ScrollArea, Tabs, Title } from "@mantine/core";
import { useEffect, useState, ReactElement } from "react";

const data = [
    {
        value: 'day',
        display: 'Ngày'
    },
    {
        value: 'week',
        display: 'Tuần'
    },
    {
        value: 'month',
        display: 'Tháng'
    },
    {
        value: 'quarter',
        display: 'Quý'
    },
    {
        value: 'year',
        display: 'Năm'
    },

]

export default function RevenueSegment() {

    const tabList = data.map(item => (
        <Tabs.Tab value={item.value}>{item.display}</Tabs.Tab>
    ))

    const tabPanels = data.map(i => (
        <Tabs.Panel value={i.value} className="rounded-[8px] border-[0.5px] p-[12px] mt-[12px]">
            <ScrollArea h='28.25rem' >
                {i.display}
            </ScrollArea>
        </Tabs.Panel>
    ))

    return (
        <Flex direction='column' gap='1rem' bg='white' className="grow z-[0] " h='100%' py='1rem' px='2rem'>
            <Title order={2} c='turquoise'>Doanh thu</Title>
            <Tabs className="grow" activateTabWithKeyboard={false}>
                <div className="rounded-[8px] border-[0.5px] p-[12px] w-[80%]">
                    <Tabs.List grow>
                        {tabList}
                    </Tabs.List>
                </div>
                {tabPanels}
            </Tabs>
        </Flex>
    )
}
