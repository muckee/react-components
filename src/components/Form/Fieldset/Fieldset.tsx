import React, {
    Fragment,
    MouseEvent,
    ReactNode,
} from 'react';
import {
    useGetClassesFromProps,
} from '@application/hooks';
import Button from '@application/components/Button';
import RemixIcon, {
    System,
} from '@application/components/RemixIcon';
import Label from '../Label';
import {
    InputProps,
} from '../Input';

import styles from './Fieldset.module.css';

export interface FieldsetInputProps extends
    InputProps,
    FieldsetProps {
        childrenAreDeletable?: boolean | undefined;
        errorMsg?: string | undefined;
        labelClassName?: string | undefined;
        deleteChild?: (toDelete: FieldsetInputProps[] | MouseEvent<HTMLButtonElement> | undefined, index?: number | undefined) => number | boolean | undefined | void;
}

export interface FieldsetProps {
  id?: string | undefined;
  className?: string | undefined;
  legendClassName?: string | undefined;
  legend?: ReactNode | undefined;
  fields?: FieldsetInputProps[] | undefined;
  children?: ReactNode | undefined;
}

// TODO: Refactor components as separate files

export const createFieldset = (input: FieldsetInputProps) => <Fieldset legend={input.legend ? input.legend : ''}>

    {input.fields && input.fields.map((field, idx) => {

        return <Fragment key={idx}>

            <div className={styles.fieldWrapper}>

                {field.type === 'fieldset'
                    ? createFieldset(field)
                    : !field.hidden
                        ? <Label
                            label={field.label}
                            input={{
                                ...field,
                                className: `${styles.field}${field.className ? ` ${field.className}` : ''}`,
                            }}
                            className={`${styles.label}${field.labelClassName ? ` ${field.labelClassName}` : ''}`}
                        />
                        : ''
                }

                {input.childrenAreDeletable && <Button
                    type='button'
                    onClick={(e) => {

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
            </div>

        </Fragment>;

    })}

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
        children,
    } = props;

    return <fieldset
        id={id ? id : ''}
        className={`${styles.fieldset}${className ? ` ${className}` : ''}`}
    >

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