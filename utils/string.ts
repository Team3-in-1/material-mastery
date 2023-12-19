const formatMoney = (money: string | number = 0, options: { currency?: 'VND' | 'USD', notation?: Intl.NumberFormatOptions['notation'] } = {}) => {
    const { currency = 'VND', notation = 'standard' } = options;
    const numericPrice = typeof (money) == 'string' ? parseFloat(money) : money;
    if (isNaN(numericPrice)) {
        return 0;
    }
    return new Intl.NumberFormat('vi-VN', {
        // style: 'currency',
        currency,
        notation,
        maximumFractionDigits: 3,
    }).format(numericPrice);
}

const formatOrderId = (id: string, createdAt: string) => {
    const parts = [...createdAt.split('/')];
    return 'MM' + `${parts[0]}${parts[1]}${parts[2].slice(2)}`.split('').reverse().join('') + id.slice(-3)
}

const formatProductId = (id: string) => {
    return 'PD' + id.slice(3) + id.slice(-3)
}

export { formatMoney, formatOrderId, formatProductId }