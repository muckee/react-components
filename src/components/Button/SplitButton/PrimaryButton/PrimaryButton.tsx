import React from 'react';
import Button from "../../Button";
import {
    SplitButtonProps,
} from "../SplitButton";

import styles from './PrimaryButton.module.css';

const PrimaryButton = (props: SplitButtonProps) => {

    const {
        title,
        type,
        className,
        status,
        onClick,
        onMouseDown,
        onMouseUp,
        onMouseOut,
        disabled,
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
    >
        {props.children}
    </Button>
};

export default PrimaryButton;