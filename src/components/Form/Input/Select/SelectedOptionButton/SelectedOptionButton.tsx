import React, {
    ReactNode,
} from 'react';
import {
    RiDeleteBackLine,
} from 'react-icons/ri';
import { DeselectEvent } from '../Select';

import styles from './SelectedOptionButton.module.css';

export type SelectedOption = string | number | readonly string[];

export type Value = SelectedOption[] | SelectedOption;

export interface SelectedItemProps {
    option: {
        label: ReactNode | string,
        value: Value,
        title?: string | undefined,
        selectedLabel?: ReactNode | string | undefined,
    };
    deselectOption: DeselectEvent | undefined;
}

const SelectedOptionButton = (props: SelectedItemProps) => {

    // TODO: Use proper type for option
    const {
        option: {
            title,
            label,
            selectedLabel,
            value,
        },
        deselectOption = () => {},
    } = props;

    const htmlTitle = title
        ? title
        : value.toString();

    const htmlLabel = selectedLabel
        ? selectedLabel
        : label
            ? label
            : '';

    return <span
        title={htmlTitle}
        className={styles.selectedOptionContainer}
    >
        <span
            className={styles.selectedOption}
        >{htmlLabel}</span>
        <hr className='verticalRule' />
        <span
            className={styles.unselectOptionButton}
            onClick={() => deselectOption(value)}
        ><RiDeleteBackLine /></span>
    </span>;
};

export default SelectedOptionButton;