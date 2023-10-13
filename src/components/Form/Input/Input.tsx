import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';
import { SelectEvent } from '../../../hooks/useSelectInput/use-select-input';

import styles from './Input.module.css';

export interface InputProps {
    name: string;
    title: string;
    label?: string | undefined;
    id?: string | undefined;
    type?: string | undefined;
    children?: ReactNode | undefined;
    hidden?: boolean | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | SelectEvent | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
    placeholder?: string | undefined;
    value?: string | undefined;
}

const Input = (props: InputProps) => {

    const {
        label,
        type,
        className,
        onChange,
    } = props;

    switch (type) {
    case 'select':
        return <Select
            {...{
                ...props,
                label: label ? label : '',
                onChange: onChange && onChange as SelectEvent,
            }}
        />;
    default:
        return <DefaultInput {...{
            ...props,
            className: `${styles.input}${className ? ` ${className}` : ''}`,
            onChange: onChange && onChange as ChangeEventHandler<HTMLInputElement>,
        }} />;
    }

};

export default Input;