import React, {
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
} from 'react';

import styles from './Button.module.css';
import { useGetClassesFromProps } from '@application/hooks';

export enum ButtonStatus {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
}

export interface ButtonProps {
    id?: string | undefined;
    title?: string | undefined;
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string | undefined;
    status?: ButtonStatus | undefined;
    outline?: boolean | undefined;
    disabled?: boolean | undefined;
    highlight?: boolean | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseDown?: MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseOut?: MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseUp?: MouseEventHandler<HTMLButtonElement> | undefined;
    onTouchStart?: TouchEventHandler<HTMLButtonElement> | undefined;
    children?: ReactNode | undefined;
}

const Button = (props: ButtonProps) => {

    const {
        id,
        title,
        type,
        outline,
        disabled,
        highlight = true,
        onClick,
        onMouseDown,
        onMouseOut,
        onMouseUp,
        onTouchStart,
        children,
    } = props;

    const classNames = useGetClassesFromProps(props);

    // Start with the default `styles.button` class.
    // If defined, add the value of `props.className` and derive the appropriate className from `props.status`.
    // If `props.outline` is set to true, add the outline class.
    const className = styles.button + `${classNames ? ` ${classNames}` : ''}` + (highlight ? ' highlight' : '') + (outline ? ' outline' : '');

    return <button
        id={id}
        title={title}
        type={type || 'button'}
        className={className}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        onTouchStart={onTouchStart}
        disabled={disabled}
    >

        {children}

    </button>;
};

export default Button;