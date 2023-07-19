import React from 'react';

import styles from './Input.module.css';

export interface InputProps {
  type: string;
  name: string;
  children?: any;
  hidden?: boolean | undefined;
  id?: string | undefined;
  min?: string | undefined;
  max?: string | undefined;
  size?: number | undefined;
  value?: string | undefined;
  accept?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined; 
  className?: string | undefined;
  disabled?: boolean | undefined;
}

const Input = (props: InputProps) => {

  return (!props.hidden) && <input
      id={props.id ? props.id : ''}
      type={props.type}
      name={props.name}
      min={props.min ? props.min : ''}
      max={props.max ? props.max : ''}
      size={props.size}
      value={props.value ? props.value : ''}
      accept={props.accept ? props.accept : ''}
      hidden={props.hidden ? props.hidden : false}
      onChange={props.onChange ? props.onChange : () => {}}
      className={`${styles.input}${props.className ? ` ${props.className}` : ''}`}
      disabled={props.disabled}
  >
    {props.children}
  </input>;
};

export default Input;