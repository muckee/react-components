import React,{
    HTMLProps,
    ReactNode,
} from 'react';
import DefaultInput, {
    DefaultInputProps,
} from './DefaultInput';
import Select, {
    SelectProps,
} from './Select';
import TextArea from './TextArea';
import styles from './Input.module.css';

export interface TextAreaProps extends Omit<HTMLProps<HTMLTextAreaElement>, 'label'> {
    type: string;
    label?: ReactNode;
}

const Input = (props: DefaultInputProps | TextAreaProps | SelectProps) => {

    const {
        type,
    } = props;

    switch (type) {
    case 'select': {

        const {
            className,
            value,
        } = props as SelectProps;

        return <Select
            {...{
                ...(props as SelectProps),
                label: (props as SelectProps).label || '',
                value: value,
                className: `${styles.input}${className ? ` ${className}` : ''}`,
            }}
        />;
    }
    case 'textarea': {

        const {
            className,
            label,
            value,
        } = props as HTMLProps<HTMLTextAreaElement>;

        return <TextArea {...{
            ...{
                ...props as HTMLProps<HTMLTextAreaElement>,
                label: label as string | undefined,
            },
            value: value as string,
            className: `${styles.input}${className ? ` ${className}` : ''}`,

        }} />;
    }
    default: {

        const {
            className,
            value,
        } = props as DefaultInputProps;

        return <DefaultInput {...{
            ...props as DefaultInputProps,
            value: value as string,
            className: `${styles.input}${className ? ` ${className}` : ''}`,
        }} />;
    }
    }

};

export default Input;