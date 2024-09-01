export function formatNumberWithSeparator(number = 0, locale = 'id-ID', maximumFractionDigits = 2): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'decimal',
        maximumFractionDigits: maximumFractionDigits,
        useGrouping: true
    })

    return formatter.format(number)
}

export const formatNumberWithStringSubstraction = (num: number): string => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    }

    return num.toString()
}
