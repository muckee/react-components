import React, {
    Fragment,
    MouseEvent,
    ReactNode,
} from 'react';
import {
    useGetClassesFromProps,
} from '@hooks';
import Button from '@components/Button';
import RemixIcon, {
    System,
} from '@components/RemixIcon';
import Label from '../Label';
import styles from './Fieldset.module.css';

export interface FieldsetProps {
    type: string;
    id?: string | undefined;
    heading?: string | undefined;
    label?: ReactNode;
    note?: string | undefined;
    childrenAreDeletable?: boolean | undefined;
    errorMsg?: string | undefined;
    labelClassName?: string | undefined;
    legend?: ReactNode | string;
    fields?: FieldsetProps[];
    hidden?: boolean | undefined;
    className?: string | undefined;
    legendClassName?: string | undefined;
    children?: ReactNode;
    deleteChild?: (toDelete: FieldsetProps[] | MouseEvent<HTMLButtonElement> | undefined, index?: number | undefined) => number | boolean | undefined | void;
}

// TODO: Refactor components as separate files

export const createFieldset = (input: FieldsetProps) => <Fieldset
    id={input.id}
    heading={input.id}
    type={input.type}
    className={`${styles.fieldset}${input.className ? ` ${input.className}` : ''}`}
>

    {input.legend && <legend
        className={`${styles.legend}${input.legendClassName ? ` ${input.legendClassName}` : ''}`}
    >{input.legend}</legend>}

    {input.fields && input.fields.map((field, idx) => {

        const {
            label: fieldLabel,
            className: fieldClassName,
            labelClassName: fieldLabelClassName,
            ...fieldInput
        } = field;

        return <Fragment key={idx}>

            {field.type === 'fieldset'
                ? createFieldset(field)
                : <Label
                    label={fieldLabel}
                    input={{
                        ...fieldInput,
                        className: `${styles.field}${fieldClassName ? ` ${fieldClassName}` : ''}`,
                    }}
                    className={`${styles.label}${fieldLabelClassName ? ` ${fieldLabelClassName}` : ''}`}
                />
            }

            {input.childrenAreDeletable && <Button
                type='button'
                onClick={(e: MouseEvent<HTMLButtonElement>) => {

                    if (input.deleteChild) {
                        if (field.type === 'fieldset') {
                            input.deleteChild(field.fields);
                        } else {
                            input.deleteChild(e, idx);
                        }
                    }
                }}
            >

                <RemixIcon
                    icon={System.DeleteBinLine}
                />

            </Button>}

        </Fragment>;

    })}

    {input.children}

    <small
        className={styles.note}
    >{input.note}</small>

    {input.errorMsg && <span
        className={`${input.errorMsg ? styles.error : ''}`}
    >{input.errorMsg}</span>}

</Fieldset>;

const Fieldset = (props: FieldsetProps) => {

    const {
        id,
        legend,
        className,
        legendClassName,
        fields,
        heading,
        children,
    } = props;

    return <fieldset
        id={id ? id : ''}
        className={`${styles.fieldset}${className ? ` ${className}` : ''}`}
    >


        {heading}

        {legend ? <legend
            className={`${styles.legend}${legendClassName ? ` ${legendClassName}` : ''}`}
        >{legend}</legend> : ''}

        {(fields && fields.length > 0) && fields.map((field, idx) => {

            const classNames = useGetClassesFromProps(field);

            return <Fragment key={idx}>

                {field.type === 'fieldset'
                    ? createFieldset({
                        ...field,
                        className: classNames,
                    })
                    : !field.hidden
                        ? <Label
                            label={field.label}
                            errorMsg={field.errorMsg}
                            input={{
                                ...field,
                                className: `${styles.field}${field.className ? ` ${field.className}` : ''}`,
                            }}
                            className={`${styles.label}${field.labelClassName ? ` ${field.labelClassName}` : ''}`}
                        />
                        : ''
                }

            </Fragment>;

        })}

        {children}

    </fieldset>;
};

export default Fieldset;