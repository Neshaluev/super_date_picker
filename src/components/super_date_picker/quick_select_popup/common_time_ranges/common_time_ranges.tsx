import React, { ChangeEvent, ReactEventHandler, useContext, useState } from 'react';

import Select from '@/components/select/select';
import Input from '@/components/input/input';
import Button from '@/components/button/button';

import './common_time_ranges.scss';
import dayjs from 'dayjs';
import { QuickSelectContext } from '../quick_select_context';

const optionTime = [
  { value: 'last', text: 'Last' },
  { value: 'next', text: 'Next' },
];
const optionsSelect = [
  { value: 'seconds', text: 'seconds' },
  { value: 'minutes', text: 'minutes' },
  { value: 'hours', text: 'hourse' },
  { value: 'days', text: 'days' },
  { value: 'weeks', text: 'weeks' },
  { value: 'months', text: 'months' },
  { value: 'years', text: 'years' },
];

export type OperationType = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export type RangeTimeType = 'last' | 'next';

export function CommonTimeRanges() {
  const { handleRangeQuickDate, handleSetAmountTime, handleSetTimeType } =
    useContext(QuickSelectContext);

  const [timeRange, setTimeRange] = useState<RangeTimeType>('last');
  const [amountTime, setAmountTime] = useState<number>(15);
  const [time, setTime] = useState<OperationType>('minutes');

  const onButton = () => {
    handleRangeQuickDate(timeRange, amountTime, time);
    handleSetAmountTime(amountTime);
    handleSetTimeType(time);
    // close popup
  };

  return (
    <div className='wrapper_common_time_ranges'>
      <Select options={optionTime} handleSelectOption={setTimeRange} value={timeRange} />
      <Input
        value={amountTime}
        type={'number'}
        color='primary'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountTime(+e.target.value)}
      />
      <Select options={optionsSelect} handleSelectOption={setTime} value={time} />
      <Button onClick={onButton} color='accent'>
        Apply
      </Button>
    </div>
  );
}

export default CommonTimeRanges;
