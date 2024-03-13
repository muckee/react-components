import React, {
    Fragment,
    ReactNode,
} from 'react';
import {
    Status,
} from '@hooks';
import SelectDropdown, {
    OnSelectAction,
    SelectOption,
    SelectedOption,
    Value,
} from './SelectDropdown';
import SelectInput from './SelectInput';
import styles from './Select.module.css';

export interface SelectProps {
    title: string;
    name: string;
    label: ReactNode;
    type: string;
    placeholder?: string | undefined;
    multi?: boolean | undefined;
    options?: SelectOption[] | undefined;
    value?: SelectedOption[] | SelectedOption | undefined;
    className?: string | undefined;
    status?: Status | undefined;
    closeOnSelect?: boolean | undefined;
    onSelect?: OnSelectAction | undefined;
    onDeselect?: OnSelectAction | undefined;
}

// TODO: Rewrite Dropdown and Select components without styles, then re-introduce styles in minimal fashion
// TODO: Test form input

const Select = (props: SelectProps) => {

    const {
        title,
        name,
        multi,
        options = [],
        value = [],
        placeholder,
        className,
        status,
        closeOnSelect,
        onSelect = () => { },
        onDeselect,
    } = props;

    const getFormElementValue: () => Value = () => {

        if(value === (undefined || null)) {
            return '';
        }

        if(typeof value === 'object') {
            value.map(s => s?.toString());

            if(multi) {
                return value;
            }

            return value[0];
        }

        return value;
    };

    return <Fragment>

        <SelectDropdown
            className={`${styles.dropdownContainer}${className ? ` ${className}` : ''}`}
            closeOnSelect={closeOnSelect}
            multi={multi}
            options={options}
            placeholder={placeholder}
            status={status}
            value={value}
            onDeselect={onDeselect}
            onSelect={onSelect}
        />

        <SelectInput
            title={title}
            name={name}
            options={options}
            value={getFormElementValue() as (string | readonly string[] | undefined)}
            multi={multi}
        />

    </Fragment>;
};

export default Select;