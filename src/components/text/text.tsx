import React, { ReactNode } from 'react';

import './text.scss';

interface TextProps {
  children: ReactNode;
  className?: string;
}

export function Text({ children, className }: TextProps) {
  return (
    <div className='text'>
      <button>{children}</button>
    </div>
  );
}

export default Text;
