const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
export const chartData = {
    pie: {
        labels: ['Label', 'Label'],
        datasets: [{
            label: '# of Votes',
            data: [3, 5],
            backgroundColor: ['#165BAA', '#F765A3']
        }]
    },
    bar: {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.random() * (1000 - 0) + 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.random() * (1000 - 0) + 0),
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
    { value: 'per', label: 'Theo ngày' }
]