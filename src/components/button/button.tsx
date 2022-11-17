import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { ReactComponent as Circle } from '@/assets/circle.svg';
import { ReactComponent as Load } from '@/assets/load.svg';
import { ReactComponent as ArrowLeft } from '@/assets/arrow-left-2.svg';
import { ReactComponent as ArrowRight } from '@/assets/arrow-right-2.svg';
import { ReactComponent as FileLoad } from '@/assets/file-load.svg';

import clsx from 'clsx';

import './button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  iconType?: string;
  onlyIcon?: boolean;
  onClick: (...args: any) => void;
}

const HashIconsMap: hashIconMap = {
  refresh: Circle,
  load: Load,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  file_load: FileLoad,
};

type hashIconMap = { [x in string]: ReactComponent };

const HashBgColorMap = {};

export const ButtonInner: FC<ButtonProps> = (props) => {
  let {
    children,
    isDisabled,
    isLoading = false,
    color = 'primary',
    iconType,
    onlyIcon,
    ...rest
  } = props;

  const renderIcon = () => {
    if (!iconType) return;

    if (isLoading) {
      return <div className='loader-button'></div>;
    }
    let Icon = HashIconsMap[iconType];

    return <Icon />;
  };

  if (isDisabled) {
    color = 'disabled';
  }

  const text = !onlyIcon && <span>{children}</span>;

  const classes = clsx('btn', color);

  return (
    <button className={classes} {...rest}>
      {renderIcon()}
      {text}
    </button>
  );
};

export const Button = ButtonInner;

export default Button;
