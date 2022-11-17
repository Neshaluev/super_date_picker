import React from 'react';
import Line from '@/components/line/line';

import './commonly_used_section.scss';
import dayjs from 'dayjs';

function CommonUsedSection() {
  // set endDate startDate
  // отдельно операции

  const handleTodayTime = () => {
    let curr = dayjs().format('HH');
    let end = dayjs().endOf('day').format('HH');

    let result = 24 - Number(curr);

    // ~ 19 hourse age -> ~ in 5 hourse
    // console.log('result', result, curr);
    const final = dayjs().hour(result).minute(0).second(0);

    console.log(`final ====`, final);
  };

  const handleWeekTime = () => {
    const currDayWeek = +dayjs().format('D');
    const endOfDayWeek = +dayjs().endOf('weeks').format('D');
    const startOfDayWeek = +dayjs().startOf('weeks').format('D');

    // ~ 4 days ago -> ~ in 3 days
    const startWeekDays = currDayWeek - startOfDayWeek;
    const endWeekDays = endOfDayWeek + 1 - currDayWeek;

    //  dayjs().endOf('weeks')
    // dayjs().startOf('weeks')
    console.log(`startWeekDays`, startWeekDays);
    console.log(`endWeekDays`, endWeekDays);
  };

  const handleMonthTime = () => {
    const currDayWeek = +dayjs().format('D');
    const endOfDayWeek = +dayjs().endOf('month').format('D');
    const startOfDayWeek = +dayjs().startOf('months').format('D');

    // ~ 16 days ago -> ~ in 14 days

    const endOfDaysWeek = endOfDayWeek - currDayWeek;
  };

  const handleYearTime = () => {
    const currDayWeek = +dayjs().format('M');
    const endOfDayWeek = +dayjs().endOf('year').format('M');
    const startOfDayWeek = +dayjs().startOf('year').format('M');

    const endOfMonthYear = endOfDayWeek - currDayWeek;

    console.log(`startOfDayWeek`, startOfDayWeek);
    console.log(`currDayWeek`, currDayWeek);
    console.log(`endOfDayWeek`, endOfDayWeek);
    console.log(`endOfMonthYear`, endOfMonthYear);
  };

  return (
    <div className='wrapper_common_used_section'>
      <Line />
      <div className='common_used_section_title'>
        <span>Commonly used</span>
      </div>
      <div className='common_used_section_content'>
        <ul>
          <li>
            <button onClick={() => handleTodayTime()}>Today</button>
          </li>
          <li>
            <button onClick={() => handleWeekTime()}>This week</button>
          </li>
          <li>
            <button onClick={() => handleMonthTime()}>This month</button>
          </li>
          <li>
            <button onClick={() => handleYearTime()}>This year</button>
          </li>
          <li>
            <button>Yesterday</button>
          </li>
          <li>
            <button>Weeke to date</button>
          </li>
          <li>
            <button>Month to date</button>
          </li>
          <li>
            <button>Year to date</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CommonUsedSection;
