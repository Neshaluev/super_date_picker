import { cloneElement, useRef, useState } from 'react';
import {
  useFloating,
  shift,
  offset,
  flip,
  arrow,
  autoUpdate,
  autoPlacement,
} from '@floating-ui/react-dom';

import './popup.scss';
import React from 'react';
import clsx from 'clsx';

interface IPopupProps {
  children: React.ReactNode;
  color?: 'white' | 'black';
  allowedPlacements?: string[];
  triggerElement?: React.ReactNode;
  contentElement?: React.ReactNode;
  onClick?: (...args: any) => void;
  onHover?: (...args: any) => void;
}

export function usePopup({ triggerElement, contentElement, color = 'white', ...restProps }: any) {
  const arrowRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
    middleware: [
      // autoPlacement({
      //   allowedPlacements: ['bottom', 'right', 'top'],
      // }),
      flip(),
      offset(10),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const renderTriggerElement = () => {
    return cloneElement(triggerElement, {
      ref: reference,
      onClick: (e: any) => {
        e.stopPropagation();
        setIsOpen(() => !isOpen);
      },
      ...restProps,
    });
  };

  const staticSide: any = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]];

  function rotateFormation(staticSide: string) {
    if (staticSide == 'top') {
      return `rotate(90deg)`;
    }
    if (staticSide == 'bottom') {
      return `rotate(270deg)`;
    }

    return null;
  }

  if (arrowRef.current) {
    Object.assign(arrowRef.current.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      transform: rotateFormation(staticSide),
      [staticSide]: '-16px',
    });
  }

  const renderContentElement = (Componet: React.Component) => {
    return (
      <div>
        <div
          id='tooltip'
          ref={(el) => {
            floating(el);
          }}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
            // opacity: isOpen ? 1 : 0,
            display: isOpen ? 'block' : 'none',
          }}
        >
          {contentElement}
          <div id='arrow' ref={arrowRef}></div>
        </div>
      </div>
    );
  };

  const renderFnContentElement = (Component: React.ReactNode) => {
    const clsArrow = clsx({
      arrow_black: color === 'black',
    });
    return (
      <div
        // id='tooltip'
        ref={(el) => {
          floating(el);
        }}
        style={{
          position: strategy,
          top: y ?? '',
          left: x ?? '',
          display: isOpen ? 'block' : 'none',
        }}
      >
        {Component}
        <div id='arrow' className={clsArrow} ref={arrowRef}></div>
      </div>
    );
  };

  const handleClosePopup = () => {
    setIsOpen(() => false);
  };
  const handleOpenPopup = () => {
    setIsOpen(() => true);
  };
  const handleTogglePopup = () => {
    setIsOpen(() => !isOpen);
  };

  return {
    renderTriggerElement,
    renderContentElement,
    handleClosePopup,
    handleOpenPopup,
    handleTogglePopup,
    reference,
    renderFnContentElement,
  };
}
