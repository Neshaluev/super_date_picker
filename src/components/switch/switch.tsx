import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { ReactComponent as Checked } from '@/assets/checked.svg';
import { ReactComponent as Close } from '@/assets/close.svg';

import './switch.scss';

const CheckedIcon = () => <Checked />;
const UncheckedIcon = () => <Close />;

export interface ISwitchProps {
  handleSwitcher: (...args: any) => void;
  value: boolean;
}

const Switch = ({ handleSwitcher, value = false }: ISwitchProps) => {
  const [toggle, setToggle] = useState<boolean>(() => value);

  const clsxSwitch = clsx(`switch_bg`, {
    active: toggle,
  });

  const handleToggle = () => {
    setToggle(() => !toggle);
    handleSwitcher(toggle);
  };
  return (
    <div
      style={{
        borderRadius: '15px',
        border: toggle ? '3px solid rgb(193, 227, 255)' : '3px solid transparent',
      }}
    >
      <div className={'wrapper_switch'} onClick={() => handleToggle()}>
        <span
          style={{
            position: 'absolute',
            left: toggle ? '-6px' : '-26px',
            top: '3px',
          }}
        >
          <CheckedIcon />
        </span>

        <div className={clsxSwitch}>
          <div className='swicher'></div>
          <span
            style={{
              position: 'absolute',
              right: toggle ? '-16px' : '4px',
              top: '2px',
            }}
          >
            <UncheckedIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Switch;
