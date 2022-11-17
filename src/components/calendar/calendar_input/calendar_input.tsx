import React, { useContext } from 'react';
import Input from '../../input/input';
import { CalendarContext } from '../calendar_context';

import './calendar_input.scss';

function CalendarInput() {
  const { currentDate } = useContext(CalendarContext);
  return (
    <div className='calendar_input'>
      <Input
        prefix='Start date'
        value={currentDate.format(`MMM D, YYYY @ HH:mm:ss.SSS`)}
        color='primary'
      />
    </div>
  );
}

export default CalendarInput;
