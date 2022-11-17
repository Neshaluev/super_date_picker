import React, { useContext } from 'react';
import CommonTimeRanges from './common_time_ranges/common_time_ranges';
import QuickSelect from './quick_select/quick_select';
import CommonUsedSection from './commonly_used_section/commonly_used_section';
import RecentlyUsedDate from './recently_used_date/recently_used_date';
import AutoRefresh from './auto_refresh/auto_refresh';
import Spacer from '@/components/spacer/spacer';

import './quick_select_popup.scss';
import { ProviderQuickSelectContext, QuickSelectContext } from './quick_select_context';

const InnerQuickSelectPopup = ({ setStartTime, setEndTime, setTime }: any) => {
  const { startQuickDate, endQuickDate, operationMap } = useContext(QuickSelectContext);

  // console.log(`setStartTime, setEndTime`, setStartTime, setEndTime);

  React.useEffect(() => {
    setTime(endQuickDate, startQuickDate);
  }, [startQuickDate, endQuickDate]);

  return (
    <div className='wrapper_quick_select_popup'>
      <QuickSelect />
      <Spacer />
      <CommonTimeRanges />
      <CommonUsedSection />
      <RecentlyUsedDate />
      <AutoRefresh />
    </div>
  );
};

const QuickSelectPopup = (props: any) => {
  return (
    <ProviderQuickSelectContext>
      <InnerQuickSelectPopup {...props} />
    </ProviderQuickSelectContext>
  );
};

export default QuickSelectPopup;
