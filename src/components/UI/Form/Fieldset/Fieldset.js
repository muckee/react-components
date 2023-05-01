import React from 'react';

import styles from './Fieldset.module.css';

const Fieldset = props => {
  return <fieldset
    id={props.id ? props.id : ''}
    className={`${styles.fieldset} ${props.className ? props.className : ''}`}
  >

    {props.legend ? <legend>{props.legend}</legend> : ''}

    {props.children}

  </fieldset>;
};

export default Fieldset;