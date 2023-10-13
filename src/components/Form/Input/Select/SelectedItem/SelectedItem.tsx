import React, {
    SetStateAction,
} from 'react';
import {
    RiDeleteBackLine,
} from 'react-icons/ri';
// import { SelectedOptionsList } from '../Select';

import themeStyles from '../../../../../theme.module.css';
import styles from './SelectedItem.module.css';

export type SelectedItemType = string | number | readonly string[];

export type Item = SelectedItemType[] | SelectedItemType;

export interface SelectedItemProps {
    label: string;
    item: Item;
    setSelectedItems:(value: SetStateAction<SelectedItemType[]>) => void;
}

const SelectedItem = (props: SelectedItemProps) => {

    const {
        label,
        item,
        setSelectedItems,
    } = props;

    const deselectOption = (value: Item) => {

        setSelectedItems((existingSelection) => {

            return existingSelection.filter(selectedItem => selectedItem !== value);
        });
    };

    return <span
        className={styles.selectedOptionContainer}
    >
        <span
            className={styles.selectedOption}
        >{label}</span>
        <hr className={themeStyles.verticalRule} />
        <span
            className={styles.unselectOptionButton}
            onClick={() => deselectOption(item)}
        ><RiDeleteBackLine /></span>
    </span>;
};

export default SelectedItem;