import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { ICalendarContext } from '../calendar_context';

export interface HookCalendar extends ICalendarContext {}

export function useCalendar(): HookCalendar {
  const [currentDate, setCurrentDate] = React.useState<Dayjs>(() => dayjs());

  const setNextMonth = () => {
    setCurrentDate((dayjs) => dayjs.subtract(1, 'month'));
  };

  const setPrevMonth = () => {
    setCurrentDate((dayjs) => dayjs.add(1, 'month'));
  };

  const handleAddMonthControl = (idx: number) => {
    setCurrentDate((dayjs) => dayjs.set('month', idx));
  };

  const handleSelectedDay = (day: Dayjs) => {
    setCurrentDate((dayjs) => day);
  };

  return {
    currentDate,
    setCurrentDate,
    handleSelectedDay,
    setNextMonth,
    setPrevMonth,
    handleAddMonthControl,
  };
}
