import React, { FC, forwardRef, InputHTMLAttributes } from 'react';

import { ReactComponent as Danger } from '@/assets/danger.svg';

import './input.scss';
import clsx from 'clsx';

export type TypeStyleButton = 'base' | 'primary' | 'success' | 'error';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
  color?: TypeStyleButton;
  error?: string;
  activeSuccess?: boolean;
  classNames?: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { prefix, error, suffix, activeSuccess = false, color = 'base', ...restProps } = props;

  const renderError = () => {
    if (!error) return;
    return <div className='input-error'>{error}</div>;
  };

  const renderPrefix = () => {
    if (!prefix) return;
    return <div className='prefix-input'>{prefix}</div>;
  };

  const renderSuffix = () => {
    if (!suffix && !error) return;

    return (
      <div className='suffix-input'>
        {suffix}
        {error && <Danger />}
      </div>
    );
  };

  const renderInput = () => {
    const clsInput = clsx(color, {
      success: activeSuccess,
    });

    const clsInputContent = clsx('input_content', {
      // rounded: !prefix && !suffix,
    });

    return (
      <div className={'input_container'}>
        {renderPrefix()}
        <div className={clsInputContent}>
          <input ref={ref} {...restProps} className={clsInput} />
        </div>
        {renderSuffix()}
      </div>
    );
  };

  return (
    <div className='wrapper_input'>
      {renderInput()}
      {renderError()}
    </div>
  );
});

export default Input;
