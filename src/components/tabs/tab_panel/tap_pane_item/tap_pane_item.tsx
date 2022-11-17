import clsx from 'clsx';
import React from 'react';
import { TabPanelProps } from '../../interface';

import './tap_pane_item.scss';

const TapPaneItem = ({ active, children, className, ...rest }: TabPanelProps) => {
  const clxItem = clsx('tap_pane_item', active ? 'show' : 'hide', className);

  return (
    <div className={clxItem} {...rest}>
      {children}
    </div>
  );
};

export default TapPaneItem;
