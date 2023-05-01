import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  return (!props.hidden) && <input
      id={props.id ? props.id : ''}
      type={props.type}
      name={props.name}
      min={props.min ? props.min : ''}
      max={props.max ? props.max : ''}
      value={props.value ? props.value : ''}
      accept={props.accept ? props.accept : ''}
      hidden={props.hidden ? props.hidden : false}
      onChange={props.onChange ? props.onChange : () => {}}
      className={`${styles.input}${props.className ? ' ' + props.className : ''}`}
      disabled={props.disabled}
  >
    {props.children}
  </input>;
};

export default Input;