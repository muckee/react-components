import React, {
    ReactNode,
} from 'react';

import styles from './Fieldset.module.css';

export interface FieldsetProps {
  id?: string | undefined;
  className?: string | undefined;
  legend?: ReactNode | undefined;
  children?: ReactNode | undefined;
}

const Fieldset = (props: FieldsetProps) => {

    const {
        id,
        className,
        legend,
        children,
    } = props;

    return <fieldset
        id={id ? id : ''}
        className={`${styles.fieldset}${className ? ` ${className}` : ''}`}
    >

        {legend ? <legend>{legend}</legend> : ''}

        {children}

    </fieldset>;
};

export default Fieldset;