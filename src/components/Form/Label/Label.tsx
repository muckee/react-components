import React, {
    Fragment,
    ReactNode,
} from 'react';
import Input, {
    DefaultInputProps,
    SelectProps,
    TextAreaProps,
} from '../Input';
import styles from './Label.module.css';

export interface LabelProps {
    label: ReactNode;
    input?: DefaultInputProps | TextAreaProps | SelectProps | undefined;
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

            {(input.type === 'file' && errorMsg) && <small
                className={styles.error}
            >{errorMsg}</small>}

            {input && <Input {...input} />}

            {(input.type !== 'file' && errorMsg) && <small
                className={styles.error}
            >{errorMsg}</small>}

        </Fragment>}

        {childrenPosition === 'after' && children}

    </label>;
};

export default Label;