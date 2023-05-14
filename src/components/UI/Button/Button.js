import React from 'react';

import styles from './Button.module.css';

const Button = props => {

  let className = styles.button;

  if(props.className) {
    className += ' ' + props.className;
  }

  if(props.status) {
    // Primary
    // Secondary
    // Text
    // Success
    // Warning
    // Danger
    // Info
    className += ' ' + props.status;
  }

  return <button
    type={props.type || 'button'}
    className={`${styles.button}${props.className ? ' ' + props.className : ''}`}
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