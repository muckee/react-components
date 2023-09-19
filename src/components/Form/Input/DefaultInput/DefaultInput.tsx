import React from 'react';

import { InputProps } from '../Input';

import styles from './DefaultInput.module.css';

export interface DefaultInputProps extends InputProps {
  min?: string | undefined;
  max?: string | undefined;
  size?: number | undefined;
  accept?: string | undefined;
  placeholder?: string | undefined;
  value?: string | undefined;
}

const DefaultInput = (props: DefaultInputProps) => {

  const {
    id,
    type,
    name,
    min,
    max,
    size,
    value,
    accept,
    hidden,
    disabled,
    onChange,
    className,
    children,
  } = props;

  return <input
    id={id ? id : ''}
    type={type ? type : 'text'}
    name={name}
    min={min ? min : ''}
    max={max ? max : ''}
    size={size}
    value={value ? value : ''}
    accept={accept ? accept : ''}
    hidden={hidden ? hidden : false}
    onChange={onChange ? onChange : () => { }}
    className={`${styles.input}${className ? ` ${className}` : ''}`}
    disabled={disabled}
  >
    {children}
  </input>;
};

export default DefaultInput;