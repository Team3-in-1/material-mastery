import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    ArcElement,
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Legend,
    Tooltip
} from "chart.js";
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend);

const mockSegmentData = [
    { value: 'general', label: 'Tổng' },
    { value: 'per', label: 'Theo ngày' }
]
const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

type Props = {
    segment?: boolean,
    segmentData?: {
        value: string, label: string
    }[],
    chartData: any,
    chartSize?: number
}

export default function StatisticChart(
    {
        chartData,
        segment = false,
        segmentData = mockSegmentData
    }: Props
) {
    const [chartType, setChartType] = useState(segmentData.at(0)?.value)
    let pieChart = (
        <div className={`w-[350px] aspect-square m-auto`}>
            <Pie data={segment ? chartData.pie : chartData} />
        </div>
    )
    let barChart = (
        <Bar className={`w-[700px]`} options={barOptions} data={chartData.bar} />
    )
    if (segment)
        return (
            <div className="flex flex-col gap-[12px] flex-wrap items-end">
                <SegmentedControl className="" size='sm' value={chartType} onChange={setChartType} data={segmentData} />
                <div className="w-[700px]">
                    {chartType === segmentData.at(0)?.value ?
                        pieChart :
                        barChart}
                </div>
            </div>
        )
    else
        return (
            <div className="w-[700px]">{pieChart}</div>
        )
}
