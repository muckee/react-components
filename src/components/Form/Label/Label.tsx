import React, {
    Fragment,
    ReactNode,
} from 'react';
import Input, {
    InputProps,
} from '../Input';

import styles from './Label.module.css';

export interface LabelProps {
  label: ReactNode | string;
  input?: InputProps | undefined;
  errorMsg?: string | undefined;
  className?: string | undefined;
  children?: ReactNode | undefined;
  childrenPosition?: ('before' | 'beforeLabel' | 'after') | undefined;
}

const Label = (props: LabelProps) => {

    const {
        label,
        input,
        errorMsg,
        className,
        children,
        childrenPosition = 'after',
    } = props;

    return <label
        className={`${styles.label}${className ? ' ' + className : ''}`}
    >

        {childrenPosition === 'beforeLabel' && children}

        {label}

        {childrenPosition === 'before' && children}

        {input && <Fragment>

            {(input.type === 'file' && errorMsg) && <span className={`${errorMsg ? styles.error : ''}`}>{errorMsg}</span>}

            {input && <Input {...input} />}

            {(input.type !== 'file' && errorMsg) && <span className={`${errorMsg ? styles.error : ''}`}>{errorMsg}</span>}

        </Fragment>}

        {childrenPosition === 'after' && children}

    </label>;
};

export default Label;