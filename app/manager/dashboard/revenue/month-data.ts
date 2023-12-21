import dayjs from "dayjs"

export const chartData = {
    pie: {
        labels: ['Labelss', 'Label'],
        datasets: [{
            label: '# of Votes',
            data: [3, 5],
            backgroundColor: ['#165BAA', '#F765A3']
        }]
    },
    bar: {
        labels: Array.from({ length: 30 }, (_, index) => index + 1),
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: Array.from({ length: 30 }, (_, index) => index + 1).map(() => Math.random() * (1000 - 0) + 0),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    },
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

export const segmentData = [ 
    { value: 'general', label: 'Tổng' },
    { value: 'per', label: 'Theo tuần' }
]