import clsx from 'clsx';
import React from 'react';
import { TypeTabPanelProps } from '../../interface';

import './tab_nav_item.scss';

const TabNavItem = ({ active, label, ...rest }: TypeTabPanelProps) => {
  const clxItem = clsx('tab_nav__item', {
    active: active,
  });
  return (
    <button className={clxItem} {...rest}>
      <span>{label}</span>
    </button>
  );
};

export default TabNavItem;
