import React, {
    ReactNode,
} from 'react';

import styles from './Label.module.css';

export interface LabelProps {
  label?: string | undefined;
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const Label = (props: LabelProps) => {

    const {
        label,
        className,
        children,
    } = props;

    return <label className={`${styles.label}${className ? ' ' + className : ''}`}>

        {label}

        {children}

    </label>;
};

export default Label;