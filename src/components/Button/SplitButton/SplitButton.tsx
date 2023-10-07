import React, {
    useState,
} from 'react';
import {
    ButtonProps, getClassNamesFromProps,
} from '../Button';
import Menu from './SplitButtonMenu';
import PrimaryButton from './PrimaryButton';
import ToggleButton from './ToggleButton';

import styles from './SplitButton.module.css';

export interface SplitButtonProps extends ButtonProps {
    splitButtonProps: ButtonProps,
    menuItems?: ButtonProps[] | undefined,
    toggleButtonClassName?: string | undefined,
}

const SplitButton = (props: SplitButtonProps) => {

    const {
        menuItems,
        disabled,
        className,
        splitButtonProps,
        toggleButtonClassName,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    return <div
        className={`${styles.container}${getClassNamesFromProps(splitButtonProps, styles)}${disabled ? ` ${styles.disabled}` : ''}${menuIsVisible ? ` ${styles.expanded}` : ''}`}
    >

        <PrimaryButton
            menuIsVisible={menuIsVisible}
            {...props}
        />

        <ToggleButton
            {...{
                ...props,
                className: `${className}${toggleButtonClassName ? ` ${toggleButtonClassName}` : ''}`,
            }}
            menuIsVisible={menuIsVisible}
            setMenuIsVisible={setMenuIsVisible} // TODO: Use a ForwardRef to declare `setMenuIsVisible()` within the `ToggleButton` component
        />

        {menuIsVisible && <Menu
            menuItems={menuItems}
            disabled={disabled}
            className={getClassNamesFromProps(splitButtonProps, styles)}
        />}

    </div>;
};

export default SplitButton;