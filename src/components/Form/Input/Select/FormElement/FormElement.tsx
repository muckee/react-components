import React from 'react';
import SelectInput, {
    SelectInputProps,
} from './SelectInput';

import styles from './FormElement.module.css';

const FormElement = (props: SelectInputProps) => {

    const {
        title,
        name,
        multi,
        value,
        options,
        className,
        optionClassName,
        onChange,
    } = props;

    return <SelectInput
        title={title}
        name={name}
        id={name}
        multi={multi ? true : false}
        value={value as string}
        options={options}
        className={`${styles.input}${className ? ` ${className}` : ''}`}
        optionClassName={optionClassName}
        onChange={onChange}
    />;
};

export default FormElement;