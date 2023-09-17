import React, {
    Fragment,
} from "react";
import Button from "../../Button/Button";
import Fieldset from "../Fieldset/Fieldset";
import Input, {
    InputProps,
} from "../Input/Input";

import styles from './InputList.module.css';
import Label from "../Label";

export interface InputListItem extends InputProps {
    before?: any;
    after?: any;
    errorMsg?: string | undefined;
    labelClassName?: string | undefined;
    legend?: any;
    label: any;
    fields?: InputListItem[] | undefined;
    childrenAreDeletable?: boolean | undefined;
    deleteChild?: (
        toDelete: any,
        index?: number | undefined,
    ) => any;
};

export interface InputListProps {
    inputs: InputListItem[];
}

export const createLabel = (input: InputListItem) => <Fragment>

    {input.before && input.before}

    {(input.type === 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

    {(!input.hidden) && <Label
        label={input.label}
        className={input.labelClassName}
    >

        {<Input {...input} />}

        {(input.type !== 'file' && input.errorMsg) && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}
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

                    <i className="ri-delete-bin-line"></i>

                </Button>}
            </div>

            {field.after && field.after}

        </Fragment>;

    })}

    {input.errorMsg && <span className={`${input.errorMsg ? styles.errorMsg : ''}`}>{input.errorMsg}</span>}

</Fieldset>;

const InputList = (props: InputListProps) => {

    return props.inputs.map((input, idx) => {

        return <Fragment key={idx}>

            {input.type === 'fieldset' ? createFieldset(input) : createLabel(input)}

        </Fragment>;

    });
}

export default InputList;
