import clsx from 'clsx';
import React, { ReactNode } from 'react';

import './layout_delimited.scss';

export interface LayoutDelimitedProps {
  prepend?: ReactNode;
  startControl?: ReactNode;
  endControl?: ReactNode;
  delimiter?: ReactNode;
  classNames?: string;
}

export function LayoutDelimited({
  prepend,
  startControl,
  delimiter = '→',
  endControl,
  classNames,
}: LayoutDelimitedProps) {
  const clsLD = clsx('layout_delimited', classNames);

  return (
    <div className={clsLD}>
      {prepend}
      {startControl}
      <span>{delimiter}</span>
      {endControl}
    </div>
  );
}

export default LayoutDelimited;
