import React, {
    ReactNode,
    useState,
} from 'react';
import {
    RiArrowDropDownLine,
    RiArrowDropUpLine,
} from 'react-icons/ri';
import {
    ButtonProps,
    ButtonStatus,
    SplitButton,
    SplitButtonProps,
} from '../Button';
import Menu from './Menu';

import { useClassNames } from '../../hooks';

import styles from './Dropdown.module.css';
import { SplitButtonPosition } from '../Button/SplitButton/SplitButton';

export interface DropdownProps extends SplitButtonProps {
    buttonProps?: ButtonProps | undefined;
    children?: ReactNode | string | undefined;
    menuItems?: ReactNode[] | string[] | (ReactNode | string)[] | undefined;
    menuClassName?: string | undefined;
    status?: ButtonStatus | undefined;
    toggleButtonProps?: ButtonProps | undefined;
}

const Dropdown = (props: DropdownProps) => {

    const {
        children,
        menuItems,
        menuClassName,
        position = SplitButtonPosition.Right,
        buttonProps,
        toggleButtonProps,
    } = props;

    const [menuIsVisible, setMenuIsVisible] = useState(false);

    const classNames = useClassNames(props);

    return <div
        className={`${styles.dropdown}${menuIsVisible ? ` ${styles.expanded}` : ''}${classNames ? ` ${classNames}` : ''}`}
    >

        <SplitButton
            className={styles.button}
            position={position}
            items={[
                {
                    children: children,
                    ...buttonProps,
                },
                {
                    children: menuIsVisible ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />,
                    onClick: () => setMenuIsVisible(!menuIsVisible),
                    ...toggleButtonProps,
                }
            ]}
            // primaryButtonProps={{
            //     children: children,
            //     ...primaryButtonProps,
            // }}
            // secondaryButtonProps={{
            //     children: menuIsVisible ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />,
            //     onClick: () => setMenuIsVisible(!menuIsVisible),
            //     ...secondaryButtonProps,
            // }}
        />

        {menuIsVisible && <Menu
            className={menuClassName}
            items={menuItems}
        />}

    </div>;
};

export default Dropdown;