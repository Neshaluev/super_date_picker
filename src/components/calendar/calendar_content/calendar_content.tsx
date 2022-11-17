import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import React, { useContext, useState } from 'react';
import { CalendarContext } from '../calendar_context';
import { generatMonth } from '../utils/generateMoth';

import './calendar_content.scss';

export function CalendarContent() {
  const { currentDate, handleSelectedDay } = useContext(CalendarContext);

  const [isFocusCalendar, setIsFocusCalendar] = useState(false);

  const dateCells = React.useMemo(
    () => generatMonth(currentDate.clone().month(), currentDate.clone().year()),
    [currentDate],
  );

  function getCurrentDayClass(day: Dayjs) {
    return day.format('DD-MM-YY') === currentDate.format('DD-MM-YY');
  }
  const clsCells = clsx('calendar_cells', {
    focused: isFocusCalendar,
  });
  return (
    <div className={clsCells}>
      {dateCells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            const isCurrMonth =
              currentDate.clone().toDate().getMonth() == day.clone().toDate().getMonth();

            const clsCell = clsx('calendar_cell', {
              active: getCurrentDayClass(day),
              outside_month: !isCurrMonth,
            });

            return (
              <div
                className={clsCell}
                key={`${idx}-${currentDate.clone().toDate().getDate()}`}
                onClick={(e) => {
                  // важно не работет outside
                  e.stopPropagation();
                  setIsFocusCalendar(true);
                  handleSelectedDay(day.clone());
                }}
              >
                <span>{day.format('DD')}</span>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CalendarContent;
