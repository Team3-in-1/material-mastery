'use client';
import {
  Flex,
  Group,
  ScrollArea,
  Tabs,
  Title,
  Text,
  Stack,
  Divider,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import {
  chartData as DayChart,
  statsData as DayStats,
  getStatisDayData,
} from './day-data';
import {
  chartData as WeekChart,
  statsData as WeekStats,
  segmentData as WeekSegment,
} from './week-data';
import {
  chartData as MonthChart,
  statsData as MonthStats,
  segmentData as MonthSegment,
  getStatisMonthData,
} from './month-data';
import {
  chartData as QuarterChart,
  statsData as QuarterStats,
  segmentData as QuarterSegment,
} from './quarter-data';
import {
  chartData as YearChart,
  statsData as YearStats,
  segmentData as YearSegment,
  getStatisYearData,
} from './year-data';
import ReportTable from '@/components/ReportTable/reportTable';
import StatisticChart from '@/components/StatisticChart/statisticChart';
import CalendarInput from '@/components/CalendarInput/calendarInput';
import {
  startOfWeek,
  startOfQuarter,
  endOfWeek,
  endOfQuarter,
} from '@/utils/date';
import dynamic from 'next/dynamic';
import StatsticCard from '@/components/StatisticChart/StatisticCard/statsticCard';
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';
import { calPer } from '@/utils/chart';

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
    segment: WeekSegment,
  },
  {
    value: 'month',
    display: 'Tháng',
    chart: MonthChart,
    stats: MonthStats,
    segment: MonthSegment,
  },
  {
    value: 'quarter',
    display: 'Quý',
    chart: QuarterChart,
    stats: QuarterStats,
    segment: QuarterSegment,
  },
  {
    value: 'year',
    display: 'Năm',
    chart: YearChart,
    stats: YearStats,
    segment: YearSegment,
  },
];

interface ResponseInterface {
  revenue: number;
  profit: number;
}
interface ChartInterface {}
interface StatsInterface {
  selectTime: ResponseInterface;
  preTime: ResponseInterface;
}
interface SegmentInterface {}

const TEMPLATE_STATS: StatsInterface[] = [
  {
    selectTime: {
      revenue: 0,
      profit: 0,
    },
    preTime: {
      revenue: 0,
      profit: 0,
    },
  },
  {
    selectTime: {
      revenue: 0,
      profit: 0,
    },
    preTime: {
      revenue: 0,
      profit: 0,
    },
  },
  {
    selectTime: {
      revenue: 0,
      profit: 0,
    },
    preTime: {
      revenue: 0,
      profit: 0,
    },
  },
  {
    selectTime: {
      revenue: 0,
      profit: 0,
    },
    preTime: {
      revenue: 0,
      profit: 0,
    },
  },
  {
    selectTime: {
      revenue: 0,
      profit: 0,
    },
    preTime: {
      revenue: 0,
      profit: 0,
    },
  },
];

export default function RevenuePage() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [chart, setChart] = useState<ChartInterface[]>();
  const [stats, setStats] = useState<StatsInterface[]>(TEMPLATE_STATS);
  const [segment, setSegment] = useState<SegmentInterface[]>();

  // const [day, setDay] = useState<Date | null>(new Date());
  // const [week, setWeek] = useState<[Date | null, Date | null]>([
  //   startOfWeek(new Date()),
  //   endOfWeek(new Date()),
  // ]);
  // const [month, setMonth] = useState<Date | null>(new Date());
  // const [quarter, setQuarter] = useState<[Date | null, Date | null]>([
  //   startOfQuarter(new Date()),
  //   endOfQuarter(new Date()),
  // ]);
  // const [year, setYear] = useState<Date | null>(new Date());

  useEffect(() => {
    if (user) {
      getStatisDayData(user, selectedDay).then((res: any) => {
        setStats((prevData: StatsInterface[]) => {
          prevData[0].selectTime = res.selectedDayData;
          prevData[0].preTime = res.preDayData;
          return [...prevData];
        });
      });
      getStatisMonthData(user, selectedDay).then((res: any) => {
        setStats((prevData: StatsInterface[]) => {
          prevData[2].selectTime = res.selectedDayData;
          prevData[2].preTime = res.preDayData;
          return [...prevData];
        });
      });
      getStatisYearData(user, selectedDay).then((res: any) => {
        setStats((prevData: StatsInterface[]) => {
          prevData[4].selectTime = res.selectedDayData;
          prevData[4].preTime = res.preDayData;
          return [...prevData];
        });
      });
    }
  }, [user, selectedDay]);
  useEffect(() => {
    router.prefetch('/staff/dashboard/in-outbound');
    router.prefetch('/staff/warehouse');
    router.prefetch('/staff/order/online');
    router.prefetch('/staff/order/offline');
  }, []);

  const tabList = tabData.map((item) => (
    <Tabs.Tab key={item.value} value={item.value}>
      {item.display}
    </Tabs.Tab>
  ));

  const tabPanels = tabData.map((i, index) => (
    <Tabs.Panel
      key={i.value}
      value={i.value}
      className=' p-[12px] flex flex-col justify-between gap-[10px]'
    >
      <CalendarInput
        type={i.value}
        time={selectedDay}
        setTime={setSelectedDay}
      />
      <div className='rounded-[8px] border-[0.5px] p-[16px] flex gap-[10px] justify-around items-center'>
        <Stack gap='1rem'>
          {i.stats?.map((i, zIndex) => (
            <StatsticCard
              key={i.label}
              label={i.label}
              number={
                zIndex === 0
                  ? stats[index].selectTime.revenue
                  : stats[index].selectTime.profit
              }
              per={
                zIndex === 0
                  ? calPer(
                      stats[index].selectTime.revenue,
                      stats[index].preTime.revenue
                    )
                  : calPer(
                      stats[index].selectTime.profit,
                      stats[index].preTime.profit
                    )
              }
              desc={i.desc}
            />
          ))}
        </Stack>
        {i.segment !== undefined ? (
          <StatisticChart
            chartData={i.chart}
            chartSize={350}
            segment
            segmentData={i.segment}
          />
        ) : (
          <StatisticChart chartData={i.chart} chartSize={350} />
        )}
      </div>
      <Divider my='sm' />
      <ReportTable />
    </Tabs.Panel>
  ));

  return (
    <ScrollArea className='h-full w-full z-[0]' py='1rem' px='2rem'>
      <Tabs
        variant='default'
        orientation='vertical'
        placement='right'
        defaultValue={tabData.at(0)?.value}
        activateTabWithKeyboard={false}
      >
        <div className='rounded-[8px] border-[0.5px] p-[12px] h-fit ml-[12px] sticky top-0'>
          <Tabs.List>{tabList}</Tabs.List>
        </div>
        {tabPanels}
      </Tabs>
    </ScrollArea>
  );
}

// export default dynamic(() => Promise.resolve(RevenuePage), { ssr: false });
