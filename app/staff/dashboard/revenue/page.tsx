'use client'
import StatsticCard from "@/components/StatisticCard/statsticCard";
import { Flex, Group, ScrollArea, Tabs, Title, Text, Stack, Divider } from "@mantine/core";
import { useState } from "react";
import { chartData as DayChart, statsData as DayStats } from './day-data'
import { chartData as WeekChart, statsData as WeekStats, segmentData as WeekSegment } from './week-data'
import { chartData as MonthChart, statsData as MonthStats, segmentData as MonthSegment } from './month-data'
import { chartData as QuarterChart, statsData as QuarterStats, segmentData as QuarterSegment } from './quarter-data'
import { chartData as YearChart, statsData as YearStats, segmentData as YearSegment } from './year-data'
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import ReportTable from "@/components/ReportTable/reportTable";
import StatisticChart from "@/components/StatisticChart/statisticChart";
import CalendarInput from "@/components/CalendarInput/calendarInput";

const tabData = [
    {
        value: 'day',
        display: 'Ngày',
        chart: DayChart,
        stats: DayStats,

    },
    {
        value: 'week',
        display: 'Tuần',
        chart: WeekChart,
        stats: WeekStats,
        segment: WeekSegment
    },
    {
        value: 'month',
        display: 'Tháng',
        chart: MonthChart,
        stats: MonthStats,
        segment: MonthSegment
    },
    {
        value: 'quarter',
        display: 'Quý',
        chart: QuarterChart,
        stats: QuarterStats,
        segment: QuarterSegment
    },
    {
        value: 'year',
        display: 'Năm',
        chart: YearChart,
        stats: YearStats,
        segment: YearSegment
    },

]



export default function RevenuePage() {

    const [date, setDate] = useState<Date | null>(new Date())


    const tabList = tabData.map(item => (
        <Tabs.Tab key={item.value} value={item.value}>{item.display}</Tabs.Tab>
    ))



    const tabPanels = tabData.map(i => (
        <Tabs.Panel key={i.value} value={i.value} className="rounded-[8px] border-[0.5px] p-[12px] flex flex-col justify-between gap-[10px]">
            <CalendarInput type={i.value} />
            <div className="flex gap-[10px] justify-around items-center">
                <Stack gap='1rem'>
                    {i.stats?.map(i => (
                        <StatsticCard key={i.label} label={i.label} number={i.number} per={i.per} desc={i.desc} />
                    ))}
                </Stack>
                {i.segment !== undefined ?
                    <StatisticChart chartData={i.chart} chartSize={350} segment segmentData={i.segment} /> :
                    <StatisticChart chartData={i.chart} chartSize={350} />}
            </div>
            <Divider my='sm' />
            <ReportTable />
        </Tabs.Panel>
    ))

    return (
        <Flex direction='column' gap='1rem' bg='white' className="grow z-[0] " h='100%' py='1rem' px='2rem'>
            <Title order={2} c='gray.9' fw='800' mt='lg'>Doanh thu</Title>
            <ScrollArea className='grow'>
                <Tabs
                    variant='default'
                    orientation="vertical"
                    placement='right'
                    defaultValue={tabData.at(0)?.value}
                    activateTabWithKeyboard={false}>
                    <div className="rounded-[8px] border-[0.5px] p-[12px] h-fit ml-[12px] sticky top-0">
                        <Tabs.List>
                            {tabList}
                        </Tabs.List>
                    </div>
                    {tabPanels}
                </Tabs>
            </ScrollArea>
        </Flex>
    )
}
