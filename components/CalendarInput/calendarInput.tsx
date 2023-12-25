'use client';
import {
  DatePickerInput,
  DateValue,
  DatesRangeValue,
  MonthPickerInput,
  YearPickerInput,
} from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';
import {
  startOfWeek,
  startOfQuarter,
  endOfWeek,
  endOfQuarter,
} from '@/utils/date';

type Props = {
  type: string;
  time: any;
  setTime: any;
};
export default function CalendarInput({ type, time, setTime }: Props) {
  const [day, setDay] = useState<Date | null>(new Date());
  const [week, setWeek] = useState<[Date | null, Date | null]>([
    startOfWeek(new Date()),
    endOfWeek(new Date()),
  ]);
  const [month, setMonth] = useState<Date | null>(new Date());
  const [quarter, setQuarter] = useState<[Date | null, Date | null]>([
    startOfQuarter(new Date()),
    endOfQuarter(new Date()),
  ]);
  const [year, setYear] = useState<Date | null>(new Date());
  const _setWeek = (selectedDate: DatesRangeValue) => {
    if (selectedDate[0] !== null && selectedDate[1] === null)
      setWeek([startOfWeek(selectedDate[0]), endOfWeek(selectedDate[0])]);
  };
  const _setQuarter = (selectedDate: DatesRangeValue) => {
    if (selectedDate[0] !== null && selectedDate[1] === null) {
      setQuarter([
        startOfQuarter(selectedDate[0]),
        endOfQuarter(selectedDate[0]),
      ]);
    }
  };
  switch (type) {
    case 'day':
      return (
        <DatePickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='DD/MM/YYYY'
          value={time}
          onChange={setTime}
        />
      );
    case 'week':
      return (
        <DatePickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='DD/MM/YYYY'
          type='range'
          value={week}
          onChange={setWeek}
        />
      );
    case 'month':
      return (
        <MonthPickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='MM/YYYY'
          value={time}
          onChange={setTime}
        />
      );
    case 'quarter':
      return (
        <MonthPickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='MM/YYYY'
          type='range'
          value={quarter}
          onChange={setQuarter}
        />
      );
    case 'year':
      return (
        <YearPickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='YYYY'
          value={time}
          onChange={setTime}
        />
      );
    default:
      return (
        <DatePickerInput
          w='fit-content'
          leftSection={<IconCalendar />}
          leftSectionPointerEvents='none'
          valueFormat='DD/MM/YYYY'
          value={time}
          onChange={setTime}
        />
      );
  }
}
