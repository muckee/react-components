import React from 'react';

import styles from './Button.module.css';

export interface DraggableButtonProps {
  "aria-describedby"?: string;​
  "data-rbd-drag-handle-context-id"?: number;
  "data-rbd-drag-handle-draggable-id"?: number;
  draggable?: boolean;
  role?: string;
  tabIndex?: number;
  onDragStart?: () => any;
};

export interface ButtonProps {
  title?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
  status?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | undefined;
  outline?: Boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  dragHandleProps?: DraggableButtonProps | undefined;
  children?: any;
}

// Dynamically concatenate classes from props
const getClassNamesFromProps = (props: ButtonProps) => {

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

    // Return the value which corresponds with the class label.

    const className:keyof ButtonProps = name;

    // If we return the value of the targeted prop directly, the class name will be hardcoded. i.e. `.{className}`.
    // We are using CSS modules, so we want to assign the value of `styles.{className}` instead.
    // We can achieve this by using bracket notation to access the desired property of `styles`.
    const propValue = props[className];

    return styles[propValue as keyof typeof styles];
  });

  // If no class names were found, don't add any classes.
  if(!classNames.length) {
    return '';
  }

  // Concatenate class names, separated by - and prepended with - a single whitespace character
  return ` ${classNames.join(' ')}`;
}

const Button = (props: ButtonProps) => {

  const {
    title,
    type,
    outline,
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseOut,
    disabled,
    dragHandleProps,
  } = props;

  // Start with the default `styles.button` class.
  // If defined, add the value of `props.className` and derive the appropriate className from `props.status`.
  // If `props.outline` is set to true, add the outline class.
  const className = styles.button + getClassNamesFromProps(props) + (outline ? ` ${styles.outline}` : '');

  return <button
    title={title}
    type={type || 'button'}
    className={className}
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseOut={onMouseOut}
    disabled={disabled}
    {... dragHandleProps ? dragHandleProps : []}
  >

    {props.children}

  </button>;
};

export default Button;