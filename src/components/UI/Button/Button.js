import React from 'react';

import styles from './Button.module.css';

const Button = props => {
  return <button
    type={props.type || 'button'}
    className={`${styles.button} ${props.className ? props.className : ''}`}
    onClick={props.onClick}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseOut={props.onMouseOut}
    disabled={props.disabled || false}
  >

    {props.children}

  </button>;
};

export default Button;