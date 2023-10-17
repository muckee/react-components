import React, {
    Fragment,
    ReactNode,
    useState,
} from 'react';
import {
    ButtonStatus,
} from '../../../Button';
import { SplitButtonPosition } from '../../../Button/SplitButton';
import Dropdown, {
    DropdownMenuButton,
} from '../../../Dropdown';
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
    title?: string | undefined;
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
    closeOnSelect?: boolean | undefined;
    onSelect?: SelectEvent | undefined;
    onDeselect?: DeselectEvent | undefined;
}

// TODO: Add styles for `multiple=false`
// TODO: Test form input

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
        closeOnSelect,
        onSelect = () => {},
        onDeselect = () => {},
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const primaryButtonLabel = !value.length
        ? placeholder
        : multi
            ? value.map((selectedItem, idx) => {

                return <SelectedOptionButton
                    key={idx}
                    option={options.find(o => o.value === selectedItem) || {
                        label: '',
                        value: '',
                    }}
                    deselectOption={onDeselect}
                />;
            })
            : <SelectedOptionButton
                option={options.find(o => o.value === value[0]) || {
                    label: '',
                    value: '',
                }}
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
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible}
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

                const optionTitle = option.title
                    ? option.title
                    : option.label
                        ? option.label
                        : `Menu item #${idx+1}`;

                return <DropdownMenuButton
                    key={idx}
                    title={optionTitle}
                    onClick={() => {

                        if(closeOnSelect || !multi) {
                            setMenuIsVisible(false);
                        }

                        onSelect(option.value);
                    }}
                >{option.label}</DropdownMenuButton>;
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