import dayjs, { Dayjs } from 'dayjs';

export const daysOfTheWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

export const fullMonthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = () => dayjs('2021-01-25').format('YYYY-MM-DDTHH:mm:ss');

export const getStartTimeOfTheDay = (day: Dayjs) =>
  day.set('hour', 0).set('minute', 0).set('seconds', 0);

export const formatFullDateTime = (day: Dayjs) => day.format(`MMM D, YYYY @ HH:mm:ss.SSS`);

export function getCurrentDayClass(day: Dayjs, currentDate: Dayjs) {
  return day.format('DD-MM-YY') === currentDate.format('DD-MM-YY');
}
