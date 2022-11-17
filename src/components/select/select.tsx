import clsx from 'clsx';
import React, {
  ChangeEvent,
  FC,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
  SyntheticEvent,
} from 'react';

import { ReactComponent as ArrowDown } from '@/assets/arrow_down.svg';

import './select.scss';

interface SelectOption extends OptionHTMLAttributes<HTMLOptionElement> {
  text: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  id: string;
  selectDefaultValue: string;
  disabled: boolean;
  className: string;
  options?: SelectOption[];
  handleSelectOption: (...args: any) => void;
}

const Select: FC<SelectProps> = (props) => {
  const {
    name,
    id,
    selectDefaultValue,
    value,
    disabled = false,
    className,
    options = [],
    handleSelectOption,
    ...rest
  } = props;

  const ref = React.useRef(null);

  const classes = clsx('select', className);

  const handleSelect = (e: any) => {
    handleSelectOption(e.target.value);
  };

  return (
    <div className='wrapper-select'>
      <select
        onChange={handleSelect}
        id={id}
        name={name}
        className={classes}
        ref={ref}
        defaultValue={selectDefaultValue}
        value={value}
        disabled={disabled}
        {...rest}
      >
        {options.map((option, index) => {
          const { text, ...rest } = option;
          return (
            <option {...rest} key={index}>
              {text}
            </option>
          );
        })}
      </select>
      <div className='select-arrow'>
        <ArrowDown />
      </div>
    </div>
  );
};

export default Select;
