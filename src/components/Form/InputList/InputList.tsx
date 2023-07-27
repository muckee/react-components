import React, { Fragment } from "react";
import Select from "react-select";
import Button from "../../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Input from "../Input/Input";

import styles from './InputList.module.css';

// TODO: Clean this junk!
export interface InputData {
  type: string;
  name: string;
  label: any;
  value?: string | undefined;
  placeholder?: string | undefined;
  defaultValue?: {
    label: string;
    value: string;
  };
  min?: string | undefined;
  max?: string | undefined;
  size?: number | undefined;
  errorMsg?: string | undefined;
  disabled?: boolean | undefined;
  hidden?: boolean | undefined;
  accept?: string | undefined;
  options?: {
    label: string | undefined;
    value: string | undefined;
  }[] | undefined;
  className?: string | undefined;
  classNames?: any;
  labelClassName?: string | undefined;
  legend?: any;
  fields?: InputData[] | undefined;
  before?: any;
  after?: any;
  isMulti?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isClearable?: boolean | undefined;
  isSearchable?: boolean | undefined;
  childrenAreDeletable?: boolean | undefined;
  deleteChild?: (
    toDelete: any,
    index?: number | undefined,
  ) => any;
  onChange?: () => any | undefined;
}

export interface InputListProps {
  inputs: InputData[];
}

const InputList = (props: InputListProps) => {

    const renderInputByType = (input: InputData) => {
        switch (input.type) {
            case 'text':
            case 'number':
            case 'file':
                return <Input
                    type={input.type}
                    name={input.name}
                    className={`${input.className ? input.className : ''}${input.errorMsg ? ' ' + styles.error : ''}`}
                    placeholder={input.placeholder ? input.placeholder : undefined}
                    value={input.value ? input.value : undefined}
                    min={input.min ? input.min : undefined}
                    max={input.max ? input.max : undefined}
                    size={input.size ? input.size : undefined}
                    hidden={input.hidden ? input.hidden : false}
                    accept={input.accept ? input.accept : undefined}
                    onChange={input.onChange ? input.onChange : () => { }}
                    disabled={input.disabled}
                />
            case 'select':
                const selectProps = {
                    name: 'quality',
                    options: input.options,
                    defaultValue: input.defaultValue ? input.defaultValue : {
                        label: '',
                        value: '',
                    },
                    placeholder: input.placeholder ? input.placeholder : undefined,
                    value: input.value === undefined ? (input.isMulti ? [] : {}) : input.value,
                    onChange: input.onChange,
                    isDisabled: input.isDisabled ? true : false,
                    isClearable: input.isClearable ? true : false,
                    isMulti: input.isMulti ? true : false,
                    isSearchable: input.isSearchable ? true : false,
                    classNames: input.classNames ? input.classNames : undefined,
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
                return <Select
                    styles={selectStyle}
                    {...selectProps}
                />;

            default:
                return <Input
                    type={input.type}
                    name={input.name}
                    className={`${input.className ? input.className : ''}${input.errorMsg ? ' ' + styles.error : ''}`}
                    placeholder={input.placeholder ? input.placeholder : undefined}
                    value={input.value ? input.value : undefined}
                    min={input.min ? input.min : undefined}
                    max={input.max ? input.max : undefined}
                    size={input.size ? input.size : undefined}
                    hidden={input.hidden ? input.hidden : false}
                    accept={input.accept ? input.accept : undefined}
                    onChange={input.onChange ? input.onChange : () => { }}
                    disabled={input.disabled}
                />
        }
    }

    const label = (input: InputData) => <Fragment>

        {input.before && input.before}

        {(input.type === 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

        {(!input.hidden) && <label className={`${styles.label}${input.labelClassName ? ' ' + input.labelClassName : ''}`}>

            {input.label}

            {renderInputByType(input)}

            {(input.type !== 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

        </label>}

        {input.after && input.after}

    </Fragment>;

    const fieldset = (input: InputData) => <Fieldset legend={input.legend ? input.legend : ''}>

        {input.fields && input.fields.map((field, idx) => {

            return <Fragment key={idx}>

                {field.before && field.before}

                <div className={styles.fieldWrapper}>

                    {field.type === 'fieldset' ? fieldset(field) : label(field)}

                    {input.childrenAreDeletable && <Button
                        type='button'
                        onClick={(e) => {

                          if(input.deleteChild) {
                            if (field.type === 'fieldset') {
                                input.deleteChild(field.fields);
                            } else {
                                input.deleteChild(e, idx);
                            }
                          }
                        }}
                    >

                        <i className="ri-delete-bin-line"></i>

                    </Button>}
                </div>

                {field.after && field.after}

            </Fragment>;

        })}

        {input.errorMsg && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

    </Fieldset>;

    return props.inputs.map((input, idx) => {

        return <Fragment key={idx}>

            {input.type === 'fieldset' ? fieldset(input) : label(input)}

        </Fragment>;

    });
}

export default InputList;
