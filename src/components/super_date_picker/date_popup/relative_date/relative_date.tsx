import React, { useState } from 'react';
import Input from '@/components/input/input';

import Select from '@/components/select/select';
import Switch from '@/components/switch/switch';
import { OperationType, RangeTimeType } from '../../interface';
import { fullFormatTime, operations, roundedTime } from '../../utils';

import './relative_date.scss';
import { Dayjs } from 'dayjs';

const options = [
  { value: 'seconds-last', text: 'Seconds ago' },
  { value: 'minutes-last', text: 'Minutes ago' },
  { value: 'hours-last', text: 'Hours ago' },
  { value: 'days-last', text: 'Days ago' },
  { value: 'weeks-last', text: 'Weeks ago' },
  { value: 'months-last', text: 'Months ago' },
  { value: 'years-last', text: 'years ago' },
  { value: 'seconds-next', text: 'Seconds from now' },
  { value: 'minutes-next', text: 'Minutes from now' },
  { value: 'hours-next', text: 'Hours from now' },
  { value: 'days-next', text: 'Days from now' },
  { value: 'weeks-next', text: 'Weeks from now' },
  { value: 'months-next', text: 'Months from now' },
  { value: 'years-next', text: 'years from now' },
];

export interface RelativeDateProps {
  handleDate: (...args: any) => void;
  currentTime: Dayjs;
}

export function RelativeDate({ handleDate, currentTime }: RelativeDateProps) {
  const [amounthTime, setAmounthTime] = useState(() => 0);
  const [typeDate, setTypeDate] = useState<OperationType | null>(null);
  const [roudedTime, setRoundedTime] = useState(() => false);

  const handleSelect = (value: string) => {
    const [time, type] = value.split('-');

    setTypeDate(() => time as OperationType);

    let resultDate = operations[type as RangeTimeType](time as OperationType, amounthTime);

    if (!roudedTime) {
      handleDate(roundedTime(time as OperationType, resultDate));
      return;
    }

    handleDate(resultDate);
  };

  const inputValue = () => {
    if (!roudedTime) {
      return fullFormatTime(roundedTime(typeDate as OperationType, currentTime));
    }

    return fullFormatTime(currentTime);
  };

  return (
    <div className='relative_date'>
      <div className='relative_date_select'>
        <Input
          type='number'
          color='primary'
          value={amounthTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmounthTime(+e.target.value)}
        />
        <Select options={options} handleSelectOption={handleSelect} />
      </div>
      <div className='relative_date_round'>
        <Switch value={roudedTime} handleSwitcher={setRoundedTime} />
        <span>Round to the minute</span>
      </div>
      <div className='relative_date_input'>
        <Input prefix={'Start date'} type='text' value={inputValue()} color='primary' />
      </div>
    </div>
  );
}

export default RelativeDate;
