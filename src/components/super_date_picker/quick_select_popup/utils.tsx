import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { OperationType } from './common_time_ranges/common_time_ranges';
import { IOperation } from './quick_select_context';

export function builderTitleForOperation(
  type: string,
  amountTime: number,
  time: string,
  endTime: Dayjs,
  startTime: Dayjs,
) {
  if (type === 'last') {
    return `Last ${amountTime} ${time}`;
  }
  if (type === 'next') {
    return `Next ${amountTime} ${time}`;
  }

  return (
    endTime.format(`MMM D, YYYY @ HH:mm:ss.SSS`) +
    ' to ' +
    startTime.format(`MMM D, YYYY @ HH:mm:ss.SSS`)
  );
}

export function builderDescriptionForOperation(
  type: string,
  amountTime: number,
  time: string,
  endTime: Dayjs,
  startTime: Dayjs,
) {
  if (type === 'last') {
    return `~ ${amountTime} ${time} ago`;
  }
  if (type === 'next') {
    return `~ in ${amountTime} ${time}`;
  }

  return (
    endTime.format(`MMM D, YYYY @ HH:mm:ss.SSS`) +
    ' to ' +
    startTime.format(`MMM D, YYYY @ HH:mm:ss.SSS`)
  );
}

export function builderRangeOperation(
  type: string,
  amountTime: number,
  currTime: string,
  endTime: Dayjs,
  startTime: Dayjs,
) {
  return {
    id: uuidv4(),
    title: builderTitleForOperation(type, amountTime, currTime, endTime, startTime),
    description: builderDescriptionForOperation(type, amountTime, currTime, endTime, startTime),
    endTime,
    startTime,
  };
}
