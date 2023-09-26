import React from 'react';
import Button from "../../Button";
import {
    SplitButtonProps,
} from "../SplitButton";

import styles from './PrimaryButton.module.css';

export interface PrimaryButtonProps extends SplitButtonProps {
    menuIsVisible: boolean;
};

const PrimaryButton = (props: PrimaryButtonProps) => {

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
        menuIsVisible,
    } = props;

    return <Button
        title={title}
        type={type}
        status={status}
        className={`${styles.button}${className ? ` ${className}` : ''}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
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