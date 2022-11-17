import React, { Component, MouseEventHandler } from 'react';
import clsx from 'clsx';

import { ReactComponent as Circle } from '@/assets/circle.svg';
import { ReactComponent as IconUpdate } from '@/assets/load.svg';

import './update_button.scss';
import { Button } from '../../button/button';
import { StatusDate } from '../super_date_picker';
import { usePopup } from '../../popup/popup';

export interface ButtonProps {
  isLoading?: boolean;
  block?: boolean;
  onlyIcon?: boolean;
  needsUpdate?: boolean;
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  statusDate: StatusDate;
}

const InnerUpdateButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    isLoading = false,
    block = false,
    onlyIcon = false,
    needsUpdate = false,
    isDisabled = false,
    onClick,
    statusDate,
  } = props;

  const renderTextButton = () => {
    let text = null;
    if (statusDate === 'ready') return (text = 'Refresh');
    if (statusDate === 'update' && isLoading) return (text = 'Updating');
    if (statusDate === 'update') return (text = 'Update');
    if (statusDate === 'notvalid') return (text = 'Update');
    return text;
  };

  const colorButton = () => {
    if (statusDate === 'ready' && !isLoading) {
      return 'primary';
    }
    if (statusDate === 'update' && !isLoading) {
      return 'success';
    }
    if (statusDate === 'update' && isLoading) {
      return 'success';
    }
    if (statusDate === 'notvalid') {
      return 'disabled';
    }
    return 'primary';
  };

  const renderIcon = () => {
    if (statusDate === 'ready' && !isLoading) {
      return 'refresh';
    }
    if (statusDate === 'update' && !isLoading) {
      return 'file_load';
    }
    if (isLoading) {
      return 'laod';
    }
  };

  const sharedButtonProps = {
    color: colorButton(),
    iconType: renderIcon(),
    isDisabled: isLoading === true || statusDate === 'notvalid',
    onClick: onClick,
    isLoading: isLoading,
  };

  const {
    handleOpenPopup: openTooltip,
    handleClosePopup: closeTooltip,
    reference: referenceTooltip,
    renderFnContentElement: wrapperTooltip,
  } = usePopup({
    color: 'black',
  });

  const renderTooltip = () => {
    return wrapperTooltip(
      <div
        className='wrp_tooltip'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          height: '40px',
          width: '100px',
          color: 'white',
          whiteSpace: 'nowrap',
          fontSize: '14px',
          backgroundColor: 'rgb(34, 34, 34)',
          padding: '5px',
        }}
      >
        Click to apply
      </div>,
    );
  };

  return (
    <div
      ref={referenceTooltip}
      onMouseMove={() => openTooltip()}
      onMouseLeave={() => closeTooltip()}
    >
      <Button {...sharedButtonProps}>{renderTextButton()}</Button>
      {renderTooltip()}
    </div>
  );
};

export const UpdateButton = InnerUpdateButton;

export default UpdateButton;
