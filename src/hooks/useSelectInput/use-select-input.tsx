import React, {
    useEffect,
    useState,
} from 'react';
import SelectedItem, {
    SelectedItemType,
} from '../../components/Form/Input/Select/SelectedItem';
import { SelectOption } from '../../components/Form/Input/Select/Select';
import Dropdown from '../../components/Dropdown';
import Button, {
    ButtonStatus,
} from '../../components/Button';
import { SplitButtonPosition } from '../../components/Button/SplitButton/SplitButton';

import styles from './use-select-input.module.css';

export type SelectEvent = (selectedItems: SelectedItemType[]) => SelectedItemType[] | void;

const useSelectInput = (
    options: SelectOption[] | undefined = [],
    placeholder: string | undefined = 'Choose an item...',
    multi?: boolean | undefined,
    status?: ButtonStatus | undefined,
    handleChange?: SelectEvent | undefined,
) => {

    const [selectedItems, setSelectedItems] = useState<SelectedItemType[]>([]);

    const selectedOptions = options.filter(option => selectedItems.find(selectedItem => selectedItem === option.value) === undefined);

    const selectOption = (value: SelectedItemType) => {

        setSelectedItems((existingSelection) => {

            if (multi) {

                return [
                    ...existingSelection,
                    value,
                ];
            }

            return [value];
        });

    };

    useEffect(() => {

        const updatedSelectedItems = selectedItems.filter(item => {

            const foundItem = options.find(option => option.value === item);

            if(foundItem === undefined) {
                return false;
            }

            return true;
        });

        if(selectedItems.length !== updatedSelectedItems.length) {
            setSelectedItems(updatedSelectedItems);
        }

    }, [options]);

    useEffect(() => {
        if(handleChange) {
            handleChange(selectedItems);
        }
    }, [selectedItems]);

    const primaryButtonLabel = !selectedItems.length
        ? placeholder
        : multi
            ? selectedItems.map((selectedItem, idx) => {

                return <SelectedItem
                    key={idx}
                    label={options.find(option => option.value === selectedItem)?.label || ''}
                    item={selectedItem}
                    setSelectedItems={setSelectedItems}
                />;
            })
            : <SelectedItem
                label={options.find(option => option.value === selectedItems[0])?.label || ''}
                item={selectedItems[0]}
                setSelectedItems={setSelectedItems}
            />;

    const itemsList = <Dropdown
        status={status}
        position={SplitButtonPosition.Right}
        buttonProps={{
            children: primaryButtonLabel,
            className: `${styles.dropdownReset} ${styles.button}`,
            highlight: false,
        }}
        toggleButtonProps={{
            className: styles.dropdownReset,
        }}
        menuItems={selectedOptions.map((option, idx) => {

            return <Button
                key={idx}
                title={option.label}
                type={'button'}
                className={styles.selectedOption}
                onClick={() => selectOption(option.value)}
            >{option.label}</Button>;
        })}
    />;

    return {
        selected: selectedItems,
        itemsList: itemsList,
    };
};

export default useSelectInput;