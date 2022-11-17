import clsx from 'clsx';
import React from 'react';

import './line.scss';

type TypeSizeLine = 's' | 'm' | 'l';
interface LineProps {
  size: TypeSizeLine;
}

const Line = ({ size }: LineProps) => {
  return <div className={clsx('line', size)}></div>;
};

export default Line;
