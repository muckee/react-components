import React from 'react';
import Label, {
    LabelProps,
} from '../../../Label';
import SelectInput, {
    SelectInputProps,
} from './SelectInput';

import styles from './FormElement.module.css';

export interface FormElementProps extends
    LabelProps,
    SelectInputProps {
    labelClassName?: string | undefined;
}

const FormElement = (props: FormElementProps) => {

    const {
        label,
        title,
        name,
        multi,
        value,
        options,
        className,
        labelClassName,
        optionClassName,
        onChange,
    } = props;

    return <Label
        label={label}
        className={`${styles.container}${labelClassName ? ` ${labelClassName}` : ''}`}
    >

        <SelectInput
            title={title}
            name={name}
            id={name}
            multi={multi ? true : false}
            value={value}
            options={options}
            className={className ? ` ${className}` : ''}
            optionClassName={optionClassName}
            onChange={onChange}
        />

    </Label>;
};

export default FormElement;