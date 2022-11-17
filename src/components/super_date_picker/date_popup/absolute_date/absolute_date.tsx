import React, { useState } from 'react';
import Calendar from '@/components/calendar/cateldar';

import './absolute_date.scss';

export function AbsoluteDate({ handleDate }: any) {
  return (
    <div>
      <Calendar executeFn={handleDate} />
    </div>
  );
}

export default AbsoluteDate;
