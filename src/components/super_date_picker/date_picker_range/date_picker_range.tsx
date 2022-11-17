import React, { CSSProperties, ReactNode, useState } from 'react';
import Input from '@/components/input/input';
import Label from '@/components/label/label';
import LayoutDelimited from '@/components/layout_delimited/layout_delimited';
import { ReactComponent as SortRight } from '@/assets/sortRight.svg';
import { ReactComponent as Calendar } from '@/assets/calendar.svg';
import { ReactComponent as ArrowDown } from '@/assets/arrow_down.svg';

import './date_picker_range.scss';
import dayjs, { Dayjs } from 'dayjs';
import { isEqualDateSome } from '../utils';

export interface DatePickerRangeProps {
  startDateControl: ReactNode;
}

interface IDatePickerRangeProps {
  startDate: Dayjs;
  endDate: Dayjs;
  openOneCalendar: (...args: any) => void;
  openTwoCalendar: (...args: any) => void;
  openQuickSelect: (...args: any) => void;
  refOneCalendar: (...args: any) => void;
  refTwoCalendar: (...args: any) => void;
  getTime: (...args: any) => { startDate: Dayjs; endDate: Dayjs };
  isValidTime: boolean;
}

export default function DatePickerRange({
  openOneCalendar,
  openTwoCalendar,
  openQuickSelect,
  refOneCalendar,
  refTwoCalendar,
  // startDate,
  // endDate,
  getTime,
  isValidTime,
}: IDatePickerRangeProps) {
  const [blocked, isBlocked] = React.useState(true);

  const { startDate, endDate } = getTime();

  // const dates = React.useMemo(() => getTime(), [])

  const propsInput: CSSProperties = {};

  if (startDate.isAfter(endDate)) {
    propsInput.color = 'success';
  } else if (isEqualDateSome(startDate, endDate)) {
    propsInput.color = '';
  } else {
    propsInput.color = 'error';
  }

  const startDateControl = (
    <button className='start_date_control' onClick={() => openQuickSelect()}>
      <span>
        <Calendar />
        <ArrowDown color='red' />
      </span>
    </button>
  );

  return (
    <div className='date_picker_range'>
      <LayoutDelimited
        prepend={startDateControl}
        delimiter={<SortRight />}
        startControl={
          <Input
            placeholder='Test start'
            value={endDate.format(`MMM D, YYYY @ HH:mm:ss.SSS`)}
            onClick={() => openOneCalendar()}
            ref={refOneCalendar}
            {...propsInput}
          />
        }
        endControl={
          <Input
            placeholder='Test end'
            onClick={() => openTwoCalendar()}
            value={startDate.format(`MMM D, YYYY @ HH:mm:ss.SSS`)}
            ref={refTwoCalendar}
            {...propsInput}
          />
        }
      />
    </div>
  );
}
