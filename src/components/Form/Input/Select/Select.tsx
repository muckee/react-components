import React, {
    ChangeEvent,
    ChangeEventHandler,
    Fragment,
    ReactNode,
} from 'react';
import FormElement from './FormElement';
import {
    SelectedItemType,
} from './SelectedItem';
import useSelectInput, {
    SelectEvent,
} from '../../../../hooks/useSelectInput/use-select-input';
import { ButtonStatus } from '../../../Button';

export interface SelectOption {
    label: string;
    value: SelectedItemType;
}

export type SelectedOptionsList = SelectedItemType[];

export interface SelectProps {
    label: ReactNode | string;
    title: string;
    name: string;
    placeholder?: string | undefined;
    multi?: boolean | undefined;
    options?: SelectOption[] | undefined;
    status?: ButtonStatus | undefined;
    onChange?: SelectEvent | undefined;
}

const Select = (props: SelectProps) => {

    const {
        label,
        name,
        multi,
        onChange,
        options = [],
        placeholder,
        status,
        title,
    } = props;

    const formElementChange: ChangeEventHandler<HTMLSelectElement> = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e);
    };

    const {
        itemsList,
        selected,
    } = useSelectInput(
        options,
        placeholder,
        multi,
        status,
        onChange,
    );

    const value = multi === true
        ? selected.map(s => s.toString())
        : selected.length
            ? selected[0]
            : '';

    return <Fragment>

        {itemsList}

        {/* TODO: After testing, move FormElement inside useSelectInput hook */}

        <FormElement
            label={label}
            title={title}
            name={name}
            value={value}
            multi={multi}
            onChange={formElementChange}
        />

    </Fragment>;
};

export default Select;