'use client'
import StatsticCard from "@/components/StatisticCard/statsticCard";
import { Flex, Group, ScrollArea, Tabs, Title, Text } from "@mantine/core";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { chartData as DayChart, statsData as DayStats } from './day-data'
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import ReportTable from "@/components/ReportTable/reportTable";
Chart.register(ArcElement, Tooltip, Legend);
const tabData = [
    {
        value: 'day',
        display: 'Ngày',
        chart: DayChart,
        stats: DayStats
    },
    {
        value: 'week',
        display: 'Tuần',
        chart: DayChart,
    },
    {
        value: 'month',
        display: 'Tháng',
        chart: DayChart,
    },
    {
        value: 'quarter',
        display: 'Quý',
        chart: DayChart,
    },
    {
        value: 'year',
        display: 'Năm',
        chart: DayChart,
    },

]



export default function RevenueSegment() {

    const [date, setDate] = useState<Date | null>(new Date())

    const tabList = tabData.map(item => (
        <Tabs.Tab key={item.value} value={item.value}>{item.display}</Tabs.Tab>
    ))
    const test = (selectedDate: Date | null) => {
        setDate(selectedDate)
    }


    const tabPanels = tabData.map(i => (
        <Tabs.Panel key={i.value} value={i.value} className="rounded-[8px] border-[0.5px] p-[12px] flex justify-between gap-[10px]">
            <div className="flex flex-col gap-[10px] ">
                <DatePickerInput
                    w='fit-content'
                    mb='md'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="DD/MM/YYYY"
                    value={date}
                    onChange={test} />
                <Group gap='0.5rem' wrap='nowrap'>
                    {i.stats?.map(i => (
                        <StatsticCard key={i.label} label={i.label} number={i.number} per={i.per} desc={i.desc} />
                    ))}
                </Group>
                <div className="w-[250px] aspect-square"> <Pie data={i.chart} /></div>
            </div>
            <div className="basis-[60%]"><ReportTable /></div>
        </Tabs.Panel>
    ))

    return (
        <Flex direction='column' gap='1rem' bg='white' className="grow z-[0] " h='100%' py='1rem' px='2rem'>
            <Title order={2} c='gray.9' fw='800' mt='lg'>Doanh thu</Title>
            <Tabs
                variant='pills'
                orientation="vertical"
                placement='right'
                defaultValue={tabData.at(0)?.value}
                activateTabWithKeyboard={false}>
                <div className="rounded-[8px] border-[0.5px] p-[12px] h-fit ml-[12px]">
                    <Tabs.List>
                        {tabList}
                    </Tabs.List>
                </div>
                {tabPanels}
            </Tabs>
        </Flex>
    )
}
