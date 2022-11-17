import React, { useContext } from 'react';

import Button from '@/components/button/button';
import { ReactComponent as ArrowLeft } from '@/assets/arrow-left-2.svg';
import { ReactComponent as ArrowRight } from '@/assets/arrow-right-2.svg';

import './quick_select.scss';
import { QuickSelectContext } from '../quick_select_context';

const QuickSelect = () => {
  const { handleSetNextTime, handleSetPreviusTime } = useContext(QuickSelectContext);

  const handlePreviusTime = () => {
    handleSetPreviusTime();
  };
  const handleNextTime = () => {
    handleSetNextTime();
  };

  return (
    <div className='wrapper_quick_select'>
      <div className='quick_select_header'>
        <span className='quick_select_title'>Quick select</span>
        <div>
          <span>
            <Button
              color='base'
              iconType='arrowLeft'
              onlyIcon={true}
              onClick={() => handlePreviusTime()}
            ></Button>
          </span>
          <span>
            <Button
              color='base'
              iconType='arrowRight'
              onlyIcon={true}
              onClick={() => handleNextTime()}
            ></Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickSelect;
