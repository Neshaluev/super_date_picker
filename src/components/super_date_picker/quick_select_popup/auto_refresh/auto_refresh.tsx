import React from 'react';
import Line from '@/components/line/line';
import Switch from '@/components/switch/switch';
import Input from '@/components/input/input';
import Select from '@/components//select/select';

import './auto_refresh.scss';
import Button from '../../../button/button';

export default function AutoRefresh() {
  return (
    <>
      <Line />
      <div className='wrapper_auto_refresh'>
        <div className='auto_refresh_switcher'>
          <Switch />
          <span>Refresh every</span>
        </div>
        <Input type={'number'} color='primary' />
        <Button onClick={() => {}} disabled>
          Start
        </Button>
      </div>
    </>
  );
}
