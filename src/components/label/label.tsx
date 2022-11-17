import clsx from 'clsx';
import React, { ReactNode } from 'react';

import './label.scss';

interface LabelProps {
  children: ReactNode;
  className?: string;
}

const Label = ({ children, className }: LabelProps) => {
  const clsLabel = clsx('label', className);
  return <label className={clsLabel}>{children}</label>;
};

export default Label;
