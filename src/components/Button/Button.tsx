import React, {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ReactNode,
} from 'react';

import styles from './Button.module.css';
import { useClassNames } from '../../hooks';

export interface DraggableButtonProps {
  'aria-describedby'?: string;
  'data-rbd-drag-handle-context-id'?: number;
  'data-rbd-drag-handle-draggable-id'?: number;
  draggable?: boolean;
  role?: string;
  tabIndex?: number;
  onDragStart?: MouseEvent;
}

export enum ButtonStatus {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export interface ButtonProps {
  title?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string | undefined;
  status?: ButtonStatus | undefined;
  outline?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onMouseOut?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  highlight?: boolean | undefined;
  children?: ReactNode | undefined;
  dragHandleProps?: DraggableButtonProps | undefined;
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
        highlight = true,
        children,
        dragHandleProps,
    } = props;

    const classNames = useClassNames(props);

    // Start with the default `styles.button` class.
    // If defined, add the value of `props.className` and derive the appropriate className from `props.status`.
    // If `props.outline` is set to true, add the outline class.
    const className = styles.button + `${classNames ? ` ${classNames}` : ''}` + (highlight ? ' highlight' : '') + (outline ? ' outline' : '');

    return <button
        title={title}
        type={type || 'button'}
        className={className}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        disabled={disabled}
        // TODO: Create drag'n'drop component which can be used as a wrapper and remove any references `dragHandleProps` from this component.
        {... dragHandleProps ? dragHandleProps as DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> : []}
    >

        {children}

    </button>;
};

export default Button;