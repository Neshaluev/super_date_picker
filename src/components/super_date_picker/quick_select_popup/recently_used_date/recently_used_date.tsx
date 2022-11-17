import React, { useContext } from 'react';
import Line from '@/components/line/line';
import Button from '@/components/button/button';
import Spacer from '@/components/spacer/spacer';
import Text from '@/components//text/text';

import { QuickSelectContext } from '../quick_select_context';

import './recently_used_date.scss';

function RecentlyUsedDate() {
  const { operationMap, handleSetQuickDate } = useContext(QuickSelectContext);

  const isExistRecentlyUsedDate = !!operationMap.size;

  return (
    <>
      {isExistRecentlyUsedDate && (
        <div className='wrapper_recently_used_date'>
          <Line size='m' />
          <div className='recently_used_date_title'>
            <span>Recently used date ranges</span>
          </div>
          <div className='recently_used_date_content'>
            <ul>
              {[...operationMap].reverse().map(([key, data]) => {
                return (
                  <li key={data.id} onClick={() => handleSetQuickDate(data)}>
                    <span>
                      <Text>{data.title}</Text>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <Line />
          <div className='recently_used_date_all_times'>
            <span>My custom panel</span>
            <Spacer />
            <div>
              <Text>Entire dataset timerange</Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecentlyUsedDate;
