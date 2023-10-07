import React, {
    useState,
} from 'react';
// import Button, {
import {
    ButtonProps, getClassNamesFromProps,
    // getClassNamesFromProps,
} from '../Button';
import Menu from './SplitButtonMenu';
// import Menu from '../../Menu';
import PrimaryButton from './PrimaryButton';
import ToggleButton from './ToggleButton';

import styles from './SplitButton.module.css';

export interface SplitButtonProps extends ButtonProps {
    splitButtonProps: ButtonProps,
    menuItems?: ButtonProps[] | undefined,
}

const SplitButton = (props: SplitButtonProps) => {

    const {
        menuItems,
        disabled,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    return <div
        className={`${styles.container}${getClassNamesFromProps(props.splitButtonProps, styles)}${disabled ? ` ${styles.disabled}` : ''}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
    >

        <PrimaryButton
            menuIsVisible={menuIsVisible}
            {...props}
        />

        <ToggleButton
            {...props}
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible} // TODO: Use a ForwardRef to declare `setMenuIsVisible()` within the `ToggleButton` component
        />

        {menuIsVisible && <Menu
            menuItems={menuItems}
            disabled={disabled}
            className={getClassNamesFromProps(props.splitButtonProps, styles)}
        />}

    </div>;
};

export default SplitButton;