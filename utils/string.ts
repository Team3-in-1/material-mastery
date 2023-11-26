const formatMoney = (money: string | number = 0, options: {currency?: 'VND' | 'USD',  notation?: Intl.NumberFormatOptions['notation']} = {}) => {
    const { currency = 'VND', notation = 'standard' } = options;
    const numericPrice = typeof(money) == 'string'? parseFloat(money) : money;
    if(isNaN(numericPrice)){
        return 0;
    }
    return new Intl.NumberFormat('vi-VN',{
        // style: 'currency',
        currency,
        notation,
        maximumFractionDigits: 3,
    }).format(numericPrice);
}

export {formatMoney}