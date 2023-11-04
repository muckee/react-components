import React, {
    FormEventHandler,
    ReactNode,
} from 'react';
import Button from '../Button';
import Fieldset, {
    FieldsetInputProps,
} from './Fieldset';

import styles from './Form.module.css';

export interface FormProps {
    heading?: string | undefined;
    preInputs?: ReactNode | undefined;
    children?: ReactNode | undefined;
    inputs?: FieldsetInputProps[] | undefined;
    postInputs?: ReactNode | undefined;
    onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
    className?: string | undefined;
}

const Form = (props: FormProps) => {

    const {
        heading,
        children,
        inputs,
        onSubmit,
        className,
    } = props;

    return <form
        onSubmit={(e) => {
            e.preventDefault();

            if(onSubmit) {
                onSubmit(e);
            }
        }}
        className={`${styles.form} ${className ? className : ''}`}
    >
        {heading && <h3>{heading}</h3>}

        {children}

        {inputs && <Fieldset
            fields={inputs}
        />}

        {onSubmit && <Button
            type='submit'
        >
            Submit
        </Button>}

    </form>;
};

export default Form;