import React, { Fragment } from "react";
import Select from "react-select";
import Button from "../../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Input from "./Input";

import styles from './InputList.module.css';

const InputList = props => {

    const renderInputByType = input => {
        switch(input.type) {
            case 'text':
            case 'number':
            case 'file':
                return <Input
                    type={input.type}
                    name={input.name}
                    className={`${input.className ? input.className : ''}${input.errorMsg ? ' ' + styles.error : ''}`}
                    value={input.value ? input.value : undefined}
                    min={input.min ? input.min : undefined}
                    max={input.max ? input.max : undefined}
                    size={input.size ? input.size : undefined}
                    hidden={input.hidden ? input.hidden : false}
                    accept={input.accept ? input.accept : undefined}
                    onChange={input.onChange ? input.onChange : () => {}}
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
                    value: input.value !== undefined ? input.value : (input.isMulti ? [] : {}),
                    onChange: input.onChange,
                    isDisabled: input.isDisabled ? true : false,
                    isClearable: input.isClearable ? true : false,
                };

                if (input.isMulti) {
                    selectProps.isMulti = input.isMulti;
                }
                
                const selectStyle = {
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
                    input: (styles) => ({ ...styles }),
                    placeholder: (styles) => ({ ...styles }),
                    singleValue: (styles, { data }) => ({ ...styles }),
                };
                return <Select
                    styles={selectStyle}
                    {...selectProps}
                />;

            default:
                return <Input
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange ? input.onChange : () => {}}
                />
        }
    }

    const label = (input) => <Fragment>

        {input.before && input.before}

        {(input.type === 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

        {(!input.hidden) && <label className={`${styles.label}${input.labelClassName ? ' ' + input.labelClassName : ''}`}>

            {input.label}

            {renderInputByType(input)}

            {(input.type !== 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

        </label>}

        {input.after && input.after}

    </Fragment>;

    const fieldset = (input) => <Fieldset legend={input.legend ? input.legend : ''}>

        {input.fields.map((field, idx) => {

            return <Fragment key={idx}>

                {field.before && field.before}

                <div className={styles.fieldWrapper}>

                    {field.type === 'fieldset' ? fieldset(field) : label(field)}

                    {input.childrenAreDeletable && <Button
                        type='button'
                        onClick={(e) => {
                            if(field.type === 'fieldset') {
                                input.deleteChild(field.fields);
                            } else {
                                input.deleteChild(e, idx);
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