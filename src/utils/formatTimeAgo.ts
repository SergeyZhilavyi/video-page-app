// В даном файле выполняется логика расчёта времени с момента публикации видео.
const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "always"
})

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" }
]

export function formatTimeAgo(date: string) {
    const itemDate = new Date(date)
    let duration = (itemDate.getTime() - new Date().getTime()) / 1000

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i]

        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name)
        }

        duration /= division.amount
    }
}