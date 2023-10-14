import React, {
    Fragment,
    ReactNode,
} from 'react';
import Button, {
    ButtonStatus,
} from '../../../Button';
import { SplitButtonPosition } from '../../../Button/SplitButton';
import Dropdown from '../../../Dropdown';
import FormElement from './FormElement';
import SelectedOptionButton, {
    SelectedOption,
    Value,
} from './SelectedOptionButton';

import styles from './Select.module.css';

export type SelectEvent = (value: Value) => void;

export type DeselectEvent = (value: Value) => void;

export interface SelectOption {
    label: string;
    value: SelectedOption;
}

export interface SelectProps {
    label: ReactNode | string;
    title: string;
    name: string;
    placeholder?: string | undefined;
    multi?: boolean | undefined;
    options?: SelectOption[] | undefined;
    value?: SelectedOption[] | undefined;
    status?: ButtonStatus | undefined;
    onSelect?: SelectEvent | undefined;
    onDeselect?: DeselectEvent | undefined;
}

const Select = (props: SelectProps) => {

    const {
        title,
        label,
        name,
        multi,
        options = [],
        value = [],
        placeholder,
        status,
        onSelect = () => {},
        onDeselect = () => {},
    } = props;

    const primaryButtonLabel = !value.length
        ? placeholder
        : multi
            ? value.map((selectedItem, idx) => {

                return <SelectedOptionButton
                    key={idx}
                    label={options.find(option => option.value === selectedItem)?.label || ''}
                    value={selectedItem}
                    deselectOption={onDeselect}
                />;
            })
            : <SelectedOptionButton
                label={options.find(option => option.value === value[0])?.label || ''}
                value={value[0]}
                deselectOption={onDeselect}
            />;

    const availableOptions = options.filter(option => {

        const selected = value.find(v => v === option.value);

        if(selected !== undefined) {

            return false;
        }

        return true;
    });

    const formElementValue = multi === true
        ? value.map(s => s.toString())
        : (value.length > 0)
            ? value[0]
            : '';

    return <Fragment>

        <Dropdown
            status={status}
            position={SplitButtonPosition.Right}
            buttonProps={{
                children: primaryButtonLabel,
                className: `${styles.cursorReset} ${styles.button}`,
                highlight: false,
            }}
            toggleButtonProps={{
                className: styles.cursorReset,
            }}
            menuItems={availableOptions.map((option, idx) => {

                return <Button
                    key={idx}
                    title={option.label}
                    type={'button'}
                    className={styles.selectedOption}
                    onClick={() => onSelect(option.value)}
                >{option.label}</Button>;
            })}
        />

        {/* TODO: After testing, move FormElement inside useSelectInput hook */}

        <FormElement
            label={label}
            title={title}
            name={name}
            options={options}
            value={formElementValue}
            multi={multi}
        />

    </Fragment>;
};

export default Select;