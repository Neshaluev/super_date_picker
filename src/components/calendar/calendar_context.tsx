import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import { useCalendar } from './hooks/useCalendar';

export interface ICalendarContext {
  currentDate: Dayjs;
  setNextMonth: (...args: any) => void;
  setCurrentDate: (...args: any) => void;
  setPrevMonth: (...args: any) => void;
  handleAddMonthControl: (...args: any) => void;
  handleSelectedDay: (...args: any) => void;
}

export const CalendarContext = React.createContext<ICalendarContext>({} as ICalendarContext);

export function CalendarProvider<T>({ children }: React.PropsWithChildren<T>) {
  const {
    currentDate,
    handleSelectedDay,
    setCurrentDate,
    setNextMonth,
    setPrevMonth,
    handleAddMonthControl,
  } = useCalendar();

  const data = React.useMemo(
    () => ({
      currentDate,
      setCurrentDate,
      setNextMonth,
      setPrevMonth,
      handleAddMonthControl,
      handleSelectedDay,
    }),
    [currentDate],
  );

  return <CalendarContext.Provider value={data}>{children}</CalendarContext.Provider>;
}
