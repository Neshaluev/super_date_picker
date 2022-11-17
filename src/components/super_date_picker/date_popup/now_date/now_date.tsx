import React from 'react';
import Button from '@/components/button/button';

import './now_date.scss';
import dayjs from 'dayjs';

export function NowDate({ handleDate }: any) {
  return (
    <div className='now_date'>
      <p>
        Setting the time to "now" means that on every refresh this time will be set to the time of
        the refresh.
      </p>
      <Button color='primary' onClick={() => handleDate(dayjs())}>
        Set start date and time to now
      </Button>
    </div>
  );
}

export default NowDate;
