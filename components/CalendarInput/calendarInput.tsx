import { DatePickerInput, DateValue, DatesRangeValue } from "@mantine/dates"
import { IconCalendar } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useState } from "react"

type Props = {
    type: string,
}
export default function CalendarInput({ type }: Props) {

    const startOfWeek = (selectedDate: DateValue) => {
        return dayjs(selectedDate).startOf('week').add(1, 'day').toDate()
    }
    const endOfWeek = (selectedDate: DateValue) => {
        return dayjs(selectedDate).endOf('week').add(1, 'day').toDate()
    }

    const [day, setDay] = useState<Date | null>(new Date())
    const [week, setWeek] = useState<[Date | null, Date | null]>([startOfWeek(new Date()), endOfWeek(new Date())])
    const [month, setMonth] = useState<Date | null>()
    const [quarter, setQuarter] = useState<Date | null>()
    const [year, setYear] = useState<Date | null>()
    const test = (selectedDate: DatesRangeValue) => {
        if (selectedDate[0] !== null && selectedDate[1] === null)
            setWeek([startOfWeek(selectedDate[0]), endOfWeek(selectedDate[0])])
        // setWeek(selectedDate)
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
                    onChange={test} />
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
