import dayjs, { Dayjs } from 'dayjs';
import { OperationType } from './interface';

export const isValidDate = (startDate: Dayjs, endDate: Dayjs) => {
  if (startDate.isAfter(endDate)) return true;
  else if (startDate.isSame(endDate)) return false;
  else return false;
};

export const isStartDateSome = (startDate: Dayjs, comingDate: Dayjs) =>
  comingDate.format('YYYY-MM-DD-mm-ss') === startDate.format('YYYY-MM-DD-mm-ss');

export const isEndDateSome = (endDate: Dayjs, comingDate: Dayjs) =>
  comingDate.format('YYYY-MM-DD-mm-ss') === endDate.format('YYYY-MM-DD-mm-ss');

export const isEqualDateSome = (endDate: Dayjs, startDate: Dayjs) =>
  startDate.format('YYYY-MM-DD-mm-ss') === endDate.format('YYYY-MM-DD-mm-ss');

export const roundedTime = (time: OperationType, date: Dayjs) => {
  if (time === 'seconds') {
    return date.set('second', 0);
  }

  if (time === 'minutes') {
    return date.set('second', 0);
  }

  if (time === 'hours') {
    return date.set('second', 0).set('minute', 0);
  }

  if (time === 'days') {
    return date.set('second', 0).set('minute', 0).set('hour', 0);
  }

  if (time === 'months') {
    return date.set('second', 0).set('minute', 0).set('hour', 0).set('day', 0);
  }

  if (time === 'years') {
    return date.set('second', 0).set('minute', 0).set('hour', 0).set('day', 0).set('month', 0);
  }

  return date;
};

export const operations = {
  last: (time: OperationType, value: number) => dayjs().subtract(value, time),
  next: (time: OperationType, value: number) => dayjs().add(value, time),
};

export const fullFormatTime = (time: Dayjs) => time.format(`MMM D, YYYY @ HH:mm:ss`);
