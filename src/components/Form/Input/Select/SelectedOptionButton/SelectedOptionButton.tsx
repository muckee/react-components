import React from 'react';
import {
    RiDeleteBackLine,
} from 'react-icons/ri';

import styles from './SelectedOptionButton.module.css';
import { DeselectEvent } from '../Select';

export type SelectedOption = string | number | readonly string[];

export type Value = SelectedOption[] | SelectedOption;

export interface SelectedItemProps {
    label: string;
    value: Value;
    deselectOption: DeselectEvent | undefined;
}

const SelectedOptionButton = (props: SelectedItemProps) => {

    const {
        label,
        value,
        deselectOption = () => {},
    } = props;

    return <span
        className={styles.selectedOptionContainer}
    >
        <span
            className={styles.selectedOption}
        >{label}</span>
        <hr className='verticalRule' />
        <span
            className={styles.unselectOptionButton}
            onClick={() => deselectOption(value)}
        ><RiDeleteBackLine /></span>
    </span>;
};

export default SelectedOptionButton;