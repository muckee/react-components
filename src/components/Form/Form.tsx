import React, {
    FormEventHandler,
    ReactNode,
} from 'react';
import Button from '../Button';
import InputList, {
    InputListItem,
} from './InputList/InputList';

import styles from './Form.module.css';

export interface FormProps {
    heading?: string | undefined;
    preInputs?: ReactNode | undefined;
    children?: ReactNode | undefined;
    inputs?: InputListItem[] | undefined;
    postInputs?: ReactNode | undefined;
    onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
    className?: string | undefined;
}

const Form = (props: FormProps) => {

    const {
        heading,
        preInputs,
        children,
        inputs,
        postInputs,
        onSubmit,
        className,
    } = props;

    return <form
        onSubmit={onSubmit}
        className={`${styles.form} ${className ? className : ''}`}
    >
        {heading && <h3>{heading}</h3>}

        {preInputs && preInputs}

        {children}

        {inputs && <InputList
            inputs={inputs}
        />}

        <div
            className={styles.postInputs}
        >{postInputs}</div>

        {onSubmit && <Button
            type='submit'
        >
            Submit
        </Button>}

    </form>;
};

export default Form;