import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';

import styles from './SelectInput.module.css';

export interface SelectInputProps {
    title: string;
    name: string;
    id?: string | undefined;
    multi?: boolean | undefined;
    value?: string | number | readonly string[] | undefined;
    options?: {
        value: string | number | readonly string[] | undefined,
        label?: ReactNode | string | undefined,
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
        onChange,
    } = props;

    // TODO: Instead of initialising via props, derive values from select input. Not sure if this is reasonable/possible.

    return <select
        id={id}
        title={title}
        name={name}
        multiple={multi ? true : false}
        value={value}
        onChange={onChange}
        className={`${styles.select}${className ? ` ${className}` : ''}`}
    >

        {options?.map((option, idx) => {

            return <option
                key={idx}
                value={option.value}
                className={optionClassName}
            >{option.label}</option>;
        })}

        {children}

    </select>;
};

export default SelectInput;