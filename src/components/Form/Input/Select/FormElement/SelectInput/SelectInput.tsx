import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import {
    SelectedOption,
} from '../..//SelectedOptionButton';

export interface SelectInputProps {
    title: string;
    name: string;
    id?: string | undefined;
    multi?: boolean | undefined;
    value?: string | readonly string[] | undefined;
    options?: {
        value: SelectedOption,
        label?: ReactNode | undefined,
        optionLabel?: string | undefined,
    }[] | undefined;
    children?: ReactNode | undefined;
    className?: string | undefined;
    optionClassName?: string | undefined;
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

const SelectInput = (props: SelectInputProps) => {

    const {
        id,
        title,
        name,
        multi,
        value,
        options,
        children,
        className,
        optionClassName,
        onChange = () => {},
    } = props;

    // TODO: Instead of initialising via props, derive values from select input. Not sure if this is reasonable/possible.

    return <select
        id={id}
        title={title}
        name={name}
        multiple={multi ? true : false}
        value={value}
        onChange={onChange}
        className={className}
    >

        {options?.map((option, idx) => {

            return <option
                key={idx}
                value={option.value}
                className={optionClassName}
            >{option.optionLabel ? option.optionLabel : option.value}</option>;
        })}

        {children}

    </select>;
};

export default SelectInput;