import React, { useContext, useEffect } from 'react';

import CalendarInput from './calendar_input/calendar_input';
import CalendarTimesList from './calendar_times_list/calendar_times_list';
import { CalendarContext, CalendarProvider } from './calendar_context';
import CalendarNavigate from './calendar_navigate/calendar_navigate';
import CalendarContent from './calendar_content/calendar_content';

import './calendar.scss';

export interface ICalendar {
  executeFn: (...args: any) => void;
}

export function InnerCalendar({ executeFn }: ICalendar) {
  const { currentDate } = useContext(CalendarContext);

  useEffect(() => {
    executeFn(currentDate);
  }, [currentDate]);

  return (
    <div className='wrapper-calendar'>
      <div className='calendar'>
        <div className='calendar_content'>
          <CalendarNavigate />
          <CalendarContent />
        </div>
        <CalendarTimesList />
      </div>
      <CalendarInput />
    </div>
  );
}

export const Calendar = ({ ...props }: ICalendar) => {
  return (
    <CalendarProvider>
      <InnerCalendar {...props} />
    </CalendarProvider>
  );
};

export default Calendar;
