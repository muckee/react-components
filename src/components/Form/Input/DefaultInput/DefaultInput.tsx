import React, {
    ChangeEventHandler,
    ReactNode,
} from 'react';
import styles from './DefaultInput.module.css';

export interface DefaultInputProps extends
    HTMLInputElement {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const DefaultInput = (props: DefaultInputProps) => {

    const {
        id,
        type,
        name,
        min,
        max,
        size,
        value,
        accept,
        hidden,
        disabled,
        onChange,
        className,
        children,
    } = props;

    return <input
        id={id ? id : ''}
        type={type ? type : 'text'}
        name={name}
        min={min ? min.toString() : ''}
        max={max ? max : ''}
        size={size}
        value={value ? value : ''}
        accept={accept ? accept : ''}
        hidden={hidden ? hidden : false}
        onChange={onChange ? onChange : () => { }}
        className={`${styles.input}${className ? ` ${className}` : ''}`}
        disabled={disabled}
    >
        {children as ReactNode}
    </input>;
};

export default DefaultInput;