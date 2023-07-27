import React from 'react';

import styles from './Button.module.css';

export interface ButtonProps {
  title?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
  status?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  children?: any;
}

const Button = (props: ButtonProps) => {

  const getClassName = () => {
  
    const classes = [
      'className',
      'status',
    ];
  
    const classNames: string[] = classes.filter((name: any) => {

      // Remove any class names which are not found in props

      const className:keyof ButtonProps = name;
      if(props[className]) {
        return true;
      }

      return false;

    }).map((name: any, idx: number) => {
  
      const className:keyof ButtonProps = name;

      return props[className];
    });

    // If no class names were found, don't add any classes.
    if(!classNames.length) {
      return '';
    }

    // Create string of class names to append to `className`
    // Prepend whitespace to maintain class string formatting
    return ` ${classNames.join(' ')}`;
    
  }

  return <button
    title={props.title}
    type={props.type || 'button'}
    className={`${styles.button}${getClassName()}`}
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