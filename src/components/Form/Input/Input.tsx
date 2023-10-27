import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';
import {
    SelectEvent,
} from './Select';
import {
    SelectedOption,
} from './Select/SelectedOptionButton';

import styles from './Input.module.css';
import { DeselectEvent } from './Select/Select';

export interface InputProps {
    name: string;
    title: string;
    label?: string | undefined;
    id?: string | undefined;
    type?: string | undefined;
    children?: ReactNode | undefined;
    hidden?: boolean | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onSelect?: SelectEvent | undefined;
    onDeselect?: DeselectEvent | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
    placeholder?: string | undefined;
    value?: SelectedOption[] | SelectedOption | undefined;
}

const Input = (props: InputProps) => {

    const {
        label,
        type,
        value,
        className,
    } = props;

    switch (type) {
    case 'select': {
        return <Select
            {...{
                ...props,
                label: label || '',
                value: value,
            }}
        />;
    }
    default: {
        return <DefaultInput {...{
            ...props,
            value: value as string,
            className: `${styles.input}${className ? ` ${className}` : ''}`,
        }} />;
    }
    }

};

export default Input;