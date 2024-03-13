import React, {
    FormEventHandler,
    Fragment,
    ReactNode,
} from 'react';
import Button from '@components/Button';
import Menu from '@components/Menu';
import {
    useGetClassesFromProps,
} from '@hooks';
import {
    FieldsetProps,
    createFieldset,
} from './Fieldset';
import Label from './Label';

import styles from './Form.module.css';

export interface FormProps {
    heading?: string | undefined;
    preInputs?: ReactNode | undefined;
    children?: ReactNode | undefined;
    inputs?: FieldsetProps[] | undefined;
    postInputs?: ReactNode | undefined;
    onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
    onCancel?: FormEventHandler<HTMLButtonElement> | undefined;
    className?: string | undefined;
}

const Form = (props: FormProps) => {

    const {
        heading,
        children,
        inputs,
        onCancel,
        onSubmit,
        className,
    } = props;

    const menuButtons = [];

    if (onCancel) {
        menuButtons.push(<Button
            type='button'
            onClick={onCancel}
        >
            Cancel
        </Button>);
    }

    if (onSubmit) {
        menuButtons.push(<Button
            type='submit'
        >
            Submit
        </Button>);
    }

    return <form
        onSubmit={(e) => {
            e.preventDefault();

            if (onSubmit) {
                onSubmit(e);
            }
        }}
        className={`${styles.form}${className ? ` ${className}` : ''}`}
    >
        {heading && <h3>{heading}</h3>}

        {children}

        {(inputs && inputs.length > 0) && inputs.map((input, idx) => {

            const classNames = useGetClassesFromProps(input);

            const {
                label: inputLabel,
                errorMsg: inputErrorMsg,
                className: inputClassName,
                labelClassName: inputLabelClassName,
                ...inputProps
            } = input;

            return <Fragment key={idx}>

                {input.type === 'fieldset'
                    ? createFieldset({
                        ...input,
                        className: classNames,
                    })
                    : <Label
                        label={inputLabel}
                        errorMsg={inputErrorMsg}
                        input={{
                            ...inputProps,
                            className: `${styles.field}${inputClassName ? ` ${inputClassName}` : ''}`,
                        }}
                        className={`${styles.label}${inputLabelClassName ? ` ${inputLabelClassName}` : ''}`}
                    />
                }

            </Fragment>;

        })}

        {/* {inputs && <Fieldset
            fields={inputs}
        />} */}

        <Menu items={menuButtons} />

    </form>;
};

export default Form;