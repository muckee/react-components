import React from 'react';
import Button, {
    ButtonProps,
} from '../../Button';

import styles from './PrimaryButton.module.css';

const PrimaryButton = (props: ButtonProps) => {

    const {
        children,
        className,
        disabled,
        highlight,
        onClick,
        onMouseDown,
        onMouseUp,
        onMouseOut,
        status,
        title,
        type,
    } = props;

    return <Button
        title={title}
        type={type}
        status={status}
        className={`${styles.button}${className ? ` ${className}` : ''}`}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        disabled={disabled}
        highlight={highlight}
    >
        {children}
    </Button>;
};

export default PrimaryButton;