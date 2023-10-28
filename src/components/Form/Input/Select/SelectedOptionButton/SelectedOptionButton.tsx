import React, {
    Fragment,
    ReactNode,
} from 'react';
import RemixIcon, {
    System,
} from '@application/components/RemixIcon';
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
    deselectOption?: DeselectEvent | undefined;
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
        deselectOption,
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
        className={deselectOption ? styles.selectedOptionContainer : ''}
    >
        <span
            className={deselectOption ? styles.selectedOption : ''}
        >{htmlLabel}</span>
        {deselectOption && <Fragment>
            <hr className='verticalRule' />
            <span
                className={styles.unselectOptionButton}
                onClick={() => deselectOption(value)}
            ><RemixIcon icon={System.DeleteBackLine} /></span>
        </Fragment>}
    </span>;
};

export default SelectedOptionButton;