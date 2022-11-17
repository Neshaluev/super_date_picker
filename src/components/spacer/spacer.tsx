import clsx from 'clsx';
import React from 'react';

import './spacer.scss';

export type TypeSpacerSize = 's' | 'm' | 'b';

export interface SpacerProps {
  type: TypeSpacerSize;
}

const Spacer = ({ type }: SpacerProps) => {
  return <div className={clsx('spacer', type)}></div>;
};

export default Spacer;
