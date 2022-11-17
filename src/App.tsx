import React, { useState } from 'react';
import UpdateButton from './components/super_date_picker/update_button/update_button';
import SuperDatePicker from '@/components/super_date_picker/super_date_picker';
import Popup, { usePopup } from './components/popup/popup';
import Input from './components/input/input';
import Select from './components/select/select';
import Switch from './components/switch/switch';
import { TabSandbox } from './components/tabs/tabs';
import LayoutDelimited from './components/layout_delimited/layout_delimited';
import Label from './components/label/label';
import QuickSelectPopup from './components/super_date_picker/quick_select_popup/quick_select_popup';
import DatePopup from './components/super_date_picker/date_popup/date_popup';
import DatePickerRange from './components/super_date_picker/date_picker_range/date_picker_range';
import Calendar from './components/calendar/cateldar';
import Spacer from './components/spacer/spacer';
import useOutsideClick from './components/hooks/useOutsideClick';
import useHover from './components/hooks/useHover';

function App() {
  return (
    <div className='App'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%',
          width: '1106px',
          margin: 'auto',
          padding: '10px',
          height: '500px',
          backgroundColor: '#fcf',
        }}
      >
        <SuperDatePicker />
      </div>
    </div>
  );
}

export default App;
