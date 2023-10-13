import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';
import { SelectEvent } from '../../../hooks/use-select-input';

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
        title,
        name,
        type,
        onChange,
    } = props;

    switch (type) {
    case 'select':
        return <Select
            label={label}
            title={title}
            name={name}
            onChange={onChange && onChange as SelectEvent}
        />;
    default:
        return <DefaultInput {...{
            ...props,
            onChange: onChange && onChange as ChangeEventHandler<HTMLInputElement>,
        }} />;
    }

};

export default Input;