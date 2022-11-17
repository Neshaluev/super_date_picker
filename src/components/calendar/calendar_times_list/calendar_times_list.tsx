import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React, { useContext, useMemo, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { CalendarContext } from '../calendar_context';
import { getStartTimeOfTheDay } from '../utils/utils';

import './calendar_times_list.scss';

const INTERVAL = 30;

export function CalendarTimesList() {
  const { currentDate, handleSelectedDay } = useContext(CalendarContext);

  const generateTimes = useMemo(() => {
    let times = [];
    const multiplier = 1440 / INTERVAL;
    for (let i = 0; i < multiplier; i++) {
      const currentTimes = getStartTimeOfTheDay(currentDate).add(i * 30, 'minute');
      times.push(currentTimes);
    }

    return times;
  }, [currentDate]);

  function getCurrentDayClass(day: Dayjs) {
    return day.format('HH:mm') === currentDate.format('HH:mm');
  }

  const [isFocusTimes, setIsFocusTimes] = useState(false);

  const refTimes = useOutsideClick(() => setIsFocusTimes(false));

  const clsTimesList = clsx('times_list', {
    focused: isFocusTimes,
  });

  return (
    <div className='calendar_times_list'>
      <ul className={clsTimesList} ref={refTimes} onClick={() => setIsFocusTimes(true)}>
        {generateTimes.map((t) => {
          const clsTime = clsx('time', {
            active: getCurrentDayClass(t),
          });

          return (
            <li className='times_list_item' onClick={() => handleSelectedDay(t)}>
              <span className={clsTime}>{t.format('HH:mm')}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CalendarTimesList;
