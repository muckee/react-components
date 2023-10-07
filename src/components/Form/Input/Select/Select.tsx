import React from 'react';
import SelectInput, {
    ClassNamesConfig,
    GroupBase,
} from 'react-select';
import {
    ActionMeta,
    MultiValue,
    OptionsOrGroups,
    SingleValue,
} from 'react-select/dist/declarations/src/types';
import { InputProps } from '../Input';

export interface SelectProps extends InputProps {
    onSelectChange?: ((newValue: MultiValue<string | { label: string; value: string; }> | SingleValue<string | { label: string; value: string; }>, actionMeta: ActionMeta<string | { label: string; value: string; }>) => void) | undefined;
    options?: OptionsOrGroups<string | { label: string; value: string; }, GroupBase<string | { label: string; value: string; }>> | undefined;
    defaultValue?: string | undefined;
    isClearable?: boolean | undefined;
    isMulti?: boolean | undefined;
    isSearchable?: boolean | undefined;
    classNames?: ClassNamesConfig<string | { label: string; value: string; }, boolean, GroupBase<string | { label: string; value: string; }>> | undefined;
}

const Select = (props: SelectProps) => {

    const {
        placeholder,
        value,
        options,
        defaultValue,
        disabled,
        isClearable,
        isMulti,
        isSearchable,
        classNames,
        onSelectChange,
    } = props;

    const selectProps = {
        name: 'quality',
        options: options,
        defaultValue: defaultValue ? defaultValue : {
            label: '',
            value: '',
        },
        placeholder: placeholder ? placeholder : undefined,
        value: value === undefined ? (isMulti ? [] : '') : value,
        onChange: onSelectChange,
        isDisabled: disabled ? true : false,
        isClearable: isClearable ? true : false,
        isMulti: isMulti ? true : false,
        isSearchable: isSearchable ? true : false,
        classNames: classNames ? classNames : undefined,
    };

    return <SelectInput
        {...selectProps}
    />;
};

export default Select;