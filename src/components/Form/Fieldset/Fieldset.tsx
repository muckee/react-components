import React from 'react';

import styles from './Fieldset.module.css';

export interface FieldsetProps {
  id?: string | undefined;
  className?: string | undefined;
  legend?: any;
  children?: any;
}

const Fieldset = (props: FieldsetProps) => {
  return <fieldset
    id={props.id ? props.id : ''}
    className={`${styles.fieldset}${props.className ? ` ${props.className}` : ''}`}
  >

    {props.legend ? <legend>{props.legend}</legend> : ''}

    {props.children}

  </fieldset>;
};

export default Fieldset;