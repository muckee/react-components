import React from 'react';
import Button, {
    getClassNamesFromProps,
} from '../../Button';
import { SplitButtonProps } from '../SplitButton';
import {
    RiArrowDropDownLine,
    RiArrowDropUpLine,
} from 'react-icons/ri';

import styles from './ToggleButton.module.css';

export interface ToggleButtonProps extends SplitButtonProps {
    menuIsVisible: boolean;
    setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = (props: ToggleButtonProps) => {

    const {
        splitButtonProps,
        menuIsVisible,
        setMenuIsVisible,
    } = props;

    return <div
        className={`${styles.toggleButtonContainer}${getClassNamesFromProps(props)}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
    >

        <hr className={styles.verticalRule} />

        <Button
            className={`${styles.toggleButton}`}
            onClick={() => setMenuIsVisible(!menuIsVisible)}
            {...splitButtonProps}
        >
            {menuIsVisible ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}

        </Button>

    </div>;
};

export default ToggleButton;