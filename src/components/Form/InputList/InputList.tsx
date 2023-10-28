import React, {
    Fragment,
    ReactNode,
} from 'react';
import RemixIcon, {
    System,
} from '@application/components/RemixIcon';
import Button from '@application/components/Button';
import Fieldset from '../Fieldset';
import Label from '../Label';
import Input, {
    InputProps,
} from '../Input';
import { useGetClassesFromProps } from '@application/hooks';

import styles from './InputList.module.css';

export interface InputListItem extends InputProps {
    before?: ReactNode | undefined;
    after?: ReactNode | undefined;
    errorMsg?: string | undefined;
    labelClassName?: string | undefined;
    legend?: ReactNode | undefined;
    label: string | undefined;
    fields?: InputListItem[] | undefined;
    childrenAreDeletable?: boolean | undefined;
    deleteChild?: (
        toDelete: InputListItem[] | React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
        index?: number | undefined,
    ) => number | boolean | undefined | void;
}

export interface InputListProps {
    inputs: InputListItem[];
}

// TODO: Refactor components as separate files

export const createLabel = (input: InputListItem) => <Fragment>

    {input.before && input.before}

    {(input.type === 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.error : ''}`}>{input.errorMsg}</span>}

    {(!input.hidden) && <Label
        label={input.label}
        className={input.labelClassName}
    >

        {<Input {...input} />}

        {(input.type !== 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.error : ''}`}>{input.errorMsg}</span>}
    </Label>}

    {input.after && input.after}

</Fragment>;

export const createFieldset = (input: InputListItem) => <Fieldset legend={input.legend ? input.legend : ''}>

    {input.fields && input.fields.map((field, idx) => {

        return <Fragment key={idx}>

            {field.before && field.before}

            <div className={styles.fieldWrapper}>

                {field.type === 'fieldset' ? createFieldset(field) : createLabel(field)}

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

                    <RemixIcon icon={System.DeleteBinLine} />

                </Button>}
            </div>

            {field.after && field.after}

        </Fragment>;

    })}

    {input.errorMsg && <span className={`${input.errorMsg ? styles.error : ''}`}>{input.errorMsg}</span>}

</Fieldset>;

const InputList = (props: InputListProps) => {

    const {
        inputs,
    } = props;

    return inputs.map((input, idx) => {

        const classNames = useGetClassesFromProps(input);

        return <Fragment key={idx}>

            {input.type === 'fieldset'
                ? createFieldset({
                    ...input,
                    className: classNames,
                })
                : createLabel({
                    ...input,
                    className: classNames,
                })
            }

        </Fragment>;

    });
};

export default InputList;
