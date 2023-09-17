import React from 'react';
import SelectInput from "react-select";
import { InputProps } from '../Input';

export interface SelectProps extends InputProps {
  options?: any;
  defaultValue?: any;
  isClearable?: boolean | undefined;
  isMulti?: boolean | undefined;
  isSearchable?: boolean | undefined;
  classNames?: any;
};

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
    onChange,
  } = props;

  const selectProps = {
    name: 'quality',
    options: options,
    defaultValue: defaultValue ? defaultValue : {
        label: '',
        value: '',
    },
    placeholder: placeholder ? placeholder : undefined,
    value: value === undefined ? (isMulti ? [] : {}) : value,
    onChange: onChange,
    isDisabled: disabled ? true : false,
    isClearable: isClearable ? true : false,
    isMulti: isMulti ? true : false,
    isSearchable: isSearchable ? true : false,
    classNames: classNames ? classNames : undefined,
};

const selectStyle = {
    menu: (styles: any) => {
        return {
            ...styles,
            zIndex: 20,
        };
    },
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: {
      data: any;
      isDisabled: boolean;
      isFocused: boolean;
      isSelected: boolean;
    }) => {
        const color = '#444';
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? data.color
                    : isFocused
                        ? color
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? 'white'
                    : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color
                    : undefined,
            },
        };
    },
    input: (styles: any) => ({ ...styles }),
    placeholder: (styles: any) => ({ ...styles }),
    singleValue: (styles: any, { data }: {[x: string]: any}) => ({ ...styles }),
};
return <SelectInput
    styles={selectStyle}
    {...selectProps}
/>;
};

export default Select;