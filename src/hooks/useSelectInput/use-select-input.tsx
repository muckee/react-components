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

        // Remove any selected items which no longer exist as options
        const updatedSelectedItems = selectedItems.filter(val => options.find(opt => opt.value === val) !== undefined);

        // Only update the state if it has changed

        if(updatedSelectedItems === selectedItems) {
            return;
        }

        if(updatedSelectedItems.length !== selectedItems.length) {

            setSelectedItems(updatedSelectedItems);
            return;
        }

        // If the arrays are the same length, check if any values changed

        for(let i = 0; i < selectedItems.length; i++) {

            const alreadySelected = updatedSelectedItems.find(item => item === selectedItems[i]);

            if(alreadySelected === undefined) {

                setSelectedItems(updatedSelectedItems);

                // Exit the loop
                break;
            }
        }

    }, [selectedItems]);

    useEffect(() => {
        if(handleChange) {
            handleChange(selectedItems);
        }
    }, [selectedItems]);

    const primaryButtonLabel = !selectedItems.length
        ? placeholder
        : multi
            ? selectedItems.map((selectedItem, idx) => {

                console.log(selectedItem);

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
        menuItems={selectedItems.map((optionId, idx) => {

            const option = options.find(o => o.value === optionId);

            return <Button
                key={idx}
                title={option?.label}
                type={'button'}
                className={styles.selectedOption}
                onClick={() => selectOption(option?.value ?? '')}
            >{option?.label}</Button>;
        })}
    />;

    return {
        selected: selectedItems,
        itemsList: itemsList,
    };
};

export default useSelectInput;