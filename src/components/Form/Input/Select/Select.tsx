import React, {
    Fragment,
    ReactNode,
    useState,
} from 'react';
import {
    ButtonStatus,
    SplitButtonPosition,
} from '@application/components/Button';
import Dropdown, {
    DropdownMenuButton,
} from '@application/components/Dropdown';
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
    value?: SelectedOption[] | SelectedOption | undefined;
    className?: string | undefined;
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
        className,
        status,
        closeOnSelect,
        onSelect = () => { },
        onDeselect,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const getFormElementValue: () => Value = () => {

        if(value === (undefined || null)) {
            return '';
        }

        if(typeof value === 'object') {
            value.map(s => s?.toString());

            if(multi) {
                return value;
            }

            return value[0];
        }

        return value;
    };

    const getPrimaryButtonLabel: () => ReactNode[] = () => {

        const primaryButtonLabel = [];

        if (typeof value === 'object' && value) {
            primaryButtonLabel.push(
                ...value.map((selectedItem, idx) => {

                    return <SelectedOptionButton
                        key={idx}
                        option={options.find(o => o.value === selectedItem) || {
                            label: '',
                            value: '',
                        }}
                        deselectOption={onDeselect}
                    />;
                })
            );
        } else {
            primaryButtonLabel.push(<SelectedOptionButton
                option={options.find(o => o.value === value) || {
                    label: '',
                    value: '',
                }}
                deselectOption={onDeselect}
            />);
        }

        return primaryButtonLabel;
    };

    const getPrimaryButtonContent: () => ReactNode[] | ReactNode = () => {

        const inputHasValue = typeof value === 'object' && value !== (undefined || null)
            ? value.length > 0
                ? true
                : false
            : value !== ('' || undefined || null)
                ? true
                : false;

        switch(true) {
        case inputHasValue: {
            return getPrimaryButtonLabel();
        }
        case availableOptions.length < 1: {
            return 'No options available';
        }
        case placeholder !== undefined: {
            return placeholder;
        }
        case multi: {
            return 'Choose options...';
        }
        default: {
            return 'Choose an option...';
        }
        }
    };

    const availableOptions = options.filter(option => {

        if(value === (undefined || null)) {
            return true;
        }

        switch(typeof value) {
        case 'object': {

            const selected = value.find(v => v === option.value);

            return selected === undefined;
            break;
        }
        case 'string':
        case 'number':
        default: {
            return value !== option.value;
        }
        }
    });

    const menuItems = availableOptions.map((option, idx) => {

        const optionTitle = option.title
            ? option.title
            : option.label
                ? option.label
                : `Menu item #${idx + 1}`;

        return <DropdownMenuButton
            key={idx}
            title={optionTitle}
            onClick={() => {

                if (closeOnSelect || !multi) {
                    setMenuIsVisible(false);
                }

                onSelect(option.value);
            }}
        >{option.label}</DropdownMenuButton>;
    });

    return <Fragment>

        <Dropdown
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible}
            className={className}
            status={status}
            position={SplitButtonPosition.Right}
            buttonProps={{
                children: getPrimaryButtonContent(),
                className: `${styles.cursorReset} ${styles.button}`,
                highlight: false,
            }}
            toggleButtonProps={{
                className: styles.cursorReset,
            }}
            menuItems={menuItems}
        />

        {/* TODO: After testing, move FormElement inside useSelectInput hook */}
        {/* TODO: Select input typing is fucked. Fix it. */}

        <FormElement
            label={label}
            title={title}
            name={name}
            options={options}
            value={getFormElementValue() as (string | readonly string[] | undefined)}
            multi={multi}
        />

    </Fragment>;
};

export default Select;