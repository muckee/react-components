import React from 'react';

import Button from '../Button/Button';
import InputList from './Input/InputList';

import styles from './Form.module.css';

const Form = props => {

    return <form
        onSubmit={props.onSubmit}
        className={`${styles.form} ${props.className ? props.className : ''}`}
    >
        {props.heading && <h3>props.heading</h3>}

        {props.preInputs && props.preInputs}

        {props.children}

        {props.inputs && <InputList inputs={props.inputs} />}

        <div className={styles.postInputs}>{props.postInputs && props.postInputs}</div>

        {props.onSubmit && <Button type='submit'>
            Submit
        </Button>}

    </form>;
}

export default Form;