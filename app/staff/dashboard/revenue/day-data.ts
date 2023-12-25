import queryClient from "@/helpers/client"
import StatisticsService from "@/services/statisticsService";
import { calPreDay } from "@/utils/chart";

export const getStatisDayData = async(user: any, selectedDay: Date = new Date()) => {
    const preDay = calPreDay(selectedDay);
    const selectedDayData = await getData(user, selectedDay);
    const preDayData = await getData(user, preDay);
    return {selectedDayData, preDayData};    
}

const getChartData = () => {

}

const getData = async(user: any, selectedDay: Date | string) => {
    const date = typeof selectedDay === 'string' ? selectedDay : selectedDay?.toLocaleDateString('en-GB');
    return await queryClient.ensureQueryData({
    queryKey: ['dayStatsData', date],
    queryFn: () => {
      const statisticsService = new StatisticsService(user);
      return statisticsService.getRevenueAndProfit(
        date,
        date
      );
        },
    initialData: {
        "revenue": 0,
        "profit": 0
    }
    })
}

export const chartData = {
    labels: ['Label', 'Label'],
    datasets: [{
        label: '# of Votes',
        data: [3, 5],
        backgroundColor: ['#165BAA', '#F765A3']
    }]
}

export const statsData = [
    {
        label: 'Doanh thu',
        number: 500000,
        per: 34,
        desc: 'Compare with previous day'
    },
    {
        label: 'Lợi nhuận',
        number: 50000,
        per: 28,
        desc: 'Compare with previous day'
    }
]

