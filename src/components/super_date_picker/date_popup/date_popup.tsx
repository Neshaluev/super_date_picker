import { Dayjs } from 'dayjs';
import React from 'react';
import Tabs from '../../tabs/tabs';
import AbsoluteDate from './absolute_date/absolute_date';
import NowDate from './now_date/now_date';
import RelativeDate from './relative_date/relative_date';

export interface DatePopupProps {
  handleDate: (...args: any) => void;
  currentTime: Dayjs;
}

export function DatePopup({ handleDate, currentTime }: DatePopupProps) {
  const items = [
    { label: 'Absolute', key: 'absolute', children: <AbsoluteDate handleDate={handleDate} /> },
    {
      label: 'Relative',
      key: 'relative',
      children: <RelativeDate handleDate={handleDate} currentTime={currentTime} />,
    },
    { label: 'Now', key: 'now', children: <NowDate handleDate={handleDate} /> },
  ];
  return (
    <div className='absolute_tab'>
      <Tabs items={items} defaultActiveKey={'relative'} />
    </div>
  );
}

export default DatePopup;
