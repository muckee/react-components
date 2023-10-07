import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import DefaultInput from './DefaultInput';
import Select from './Select';
import { SelectInputOnChange } from './Select/Select';

export type InputOnChange = ChangeEventHandler<HTMLInputElement>
    | SelectInputOnChange
    | undefined;

export interface InputProps {
    name: string;
    id?: string | undefined;
    type?: string | undefined;
    children?: ReactNode | undefined;
    hidden?: boolean | undefined;
    onChange?: InputOnChange;
    className?: string | undefined;
    disabled?: boolean | undefined;
    placeholder?: string | undefined;
    value?: string | undefined;
}

const Input = (props: InputProps) => {

    const {
        type,
    } = props;

    switch (type) {
    case 'select':
        return <Select {...{
            ...props,
            onChange: props.onChange as SelectInputOnChange,
        }} />;
    default:
        return <DefaultInput {...{
            ...props,
            onChange: props.onChange as ChangeEventHandler<HTMLInputElement>,
        }} />;
    }

};

export default Input;