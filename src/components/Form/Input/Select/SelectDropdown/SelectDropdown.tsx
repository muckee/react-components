import React, {
    ReactNode,
    useState,
} from 'react';
import {
    Status,
} from '@hooks';
import {
    SplitButtonPosition,
} from '@components/Button';
import Dropdown, {
    DropdownMenuButton,
} from '@components/Dropdown';
import SelectedOptionButton, {
    OnSelectAction,
    SelectedOption,
} from './SelectedOptionButton';
import styles from './SelectDropdown.module.css';

export interface SelectOption {
    label: string;
    value: SelectedOption;
    title?: string | undefined;
}

export interface SelectDropdownProps {
    className?: string | undefined;
    closeOnSelect?: boolean | undefined;
    multi?: boolean | undefined;
    options?: SelectOption[] | undefined;
    placeholder?: string | undefined;
    status?: Status | undefined;
    value?: SelectedOption[] | SelectedOption | undefined;
    onSelect?: OnSelectAction | undefined;
    onDeselect?: OnSelectAction | undefined;
}

const SelectDropdown = (props: SelectDropdownProps) => {

    const {
        className,
        closeOnSelect,
        multi,
        options = [],
        placeholder,
        status,
        value = [],
        onDeselect,
        onSelect,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const availableOptions = options.filter(option => {

        if(value === (undefined || null)) {
            return true;
        }

        switch(typeof value) {
        case 'object': {

            const selected = value.find(v => v === option.value);

            return selected === undefined;
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

                if (
                    closeOnSelect
                    || !multi
                ) {
                    setMenuIsVisible(false);
                }

                if (onSelect) {
                    onSelect(option.value);
                }
            }}
        >{option.label}</DropdownMenuButton>;
    });

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

    return <Dropdown
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
        className={`${styles.dropdownContainer}${className ? ` ${className}` : ''}`}
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
    />;
};

export default SelectDropdown;