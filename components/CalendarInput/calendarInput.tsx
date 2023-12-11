
import { DatePickerInput, DateValue, DatesRangeValue, MonthPickerInput, YearPickerInput } from "@mantine/dates"
import { IconCalendar } from "@tabler/icons-react"
import { useState } from "react"
import { startOfWeek, startOfQuarter, endOfWeek, endOfQuarter } from "@/utils/date"



type Props = {
    type: string,
}
export default function CalendarInput({ type }: Props) {



    const [day, setDay] = useState<Date | null>(new Date())
    const [week, setWeek] = useState<[Date | null, Date | null]>([startOfWeek(new Date()), endOfWeek(new Date())])
    const [month, setMonth] = useState<Date | null>(new Date())
    const [quarter, setQuarter] = useState<[Date | null, Date | null]>([startOfQuarter(new Date()), endOfQuarter(new Date())])
    const [year, setYear] = useState<Date | null>(new Date())
    const _setWeek = (selectedDate: DatesRangeValue) => {
        if (selectedDate[0] !== null && selectedDate[1] === null)
            setWeek([startOfWeek(selectedDate[0]), endOfWeek(selectedDate[0])])
    }
    const _setQuarter = (selectedDate: DatesRangeValue) => {
        if (selectedDate[0] !== null && selectedDate[1] === null) {
            setQuarter([startOfQuarter(selectedDate[0]), endOfQuarter(selectedDate[0])])
        }
    }
    switch (type) {
        case 'day':
            return (
                <DatePickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="DD/MM/YYYY"
                    value={day}
                    onChange={setDay} />
            )
        case 'week':
            return (
                <DatePickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="DD/MM/YYYY"
                    type='range'
                    value={week}
                    onChange={_setWeek} />
            )
        case 'month':
            return (
                <MonthPickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="MM/YYYY"
                    value={month}
                    onChange={setMonth} />
            )
        case 'quarter':
            return (
                <MonthPickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="MM/YYYY"
                    type='range'
                    value={quarter}
                    onChange={_setQuarter} />
            )
        case 'year':
            return (
                <YearPickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="YYYY"
                    value={year}
                    onChange={setYear} />
            )
        default:
            return (
                <DatePickerInput
                    w='fit-content'
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents='none'
                    valueFormat="DD/MM/YYYY"
                    value={day}
                    onChange={setDay} />
            )
    }

}
