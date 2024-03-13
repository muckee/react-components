import React, {
    MouseEvent,
    ReactNode,
} from 'react';
import {
    ButtonProps,
    SplitButton,
    SplitButtonProps,
} from '@components/Button';
import {
    SplitButtonPosition,
} from '@components/Button/SplitButton/SplitButton';
import {
    SelectedOption,
} from '@components/Form/Input/Select';
import RemixIcon, {
    Arrows,
} from '@components/RemixIcon';
import {
    useGetClassesFromProps,
    useClickTracker,
    Status,
} from '@hooks';
import Menu from './Menu';

import styles from './Dropdown.module.css';

export interface DropdownProps extends SplitButtonProps {
    menuIsVisible: boolean;
    setMenuIsVisible: (visible: boolean) => void;
    buttonTogglesMenu?: boolean | undefined;
    buttonProps?: ButtonProps | undefined;
    children?: ReactNode | string | undefined;
    menuItems?: (SelectedOption | ReactNode | string)[] | undefined;
    menuClassName?: string | undefined;
    menuItemClassName?: string | undefined;
    status?: Status | undefined;
    toggleButtonProps?: ButtonProps | undefined;
}

const Dropdown = (props: DropdownProps) => {

    const {
        menuIsVisible,
        setMenuIsVisible,
        children,
        menuItems,
        menuClassName,
        menuItemClassName,
        position = SplitButtonPosition.Right,
        buttonTogglesMenu = false,
        buttonProps,
        toggleButtonProps,
        disabled,
    } = props;

    const dropdownItems = [
        {
            children: children,
            ...buttonProps,
            disabled,
            onClick: (e: MouseEvent<HTMLButtonElement>) => {
                if (buttonTogglesMenu) {
                    setMenuIsVisible(!menuIsVisible);
                }
                if (buttonProps?.onClick) {
                    buttonProps.onClick(e);
                }
            },
            className: `${styles.primaryButton}${menuIsVisible ? ` ${styles.expanded}` : ''}${buttonProps?.className ? ` ${buttonProps.className}` : ''}`,
        },
    ];

    if (position === SplitButtonPosition.Right) {
        dropdownItems.push({
            children: menuIsVisible ? <RemixIcon icon={Arrows.ArrowDropUpLine} /> : <RemixIcon icon={Arrows.ArrowDropDownLine} />,
            disabled,
            onClick: () => setMenuIsVisible(!menuIsVisible),
            ...toggleButtonProps,
            className: `${styles.toggleButton}${menuIsVisible ? ` ${styles.expanded}` : ''}${toggleButtonProps?.className ? ` ${toggleButtonProps.className}` : ''}`,
        });
    } else {
        dropdownItems.unshift({
            children: menuIsVisible ? <RemixIcon icon={Arrows.ArrowDropUpLine} /> : <RemixIcon icon={Arrows.ArrowDropDownLine} />,
            disabled,
            onClick: () => setMenuIsVisible(!menuIsVisible),
            ...toggleButtonProps,
            className: `${styles.toggleButton}${menuIsVisible ? ` ${styles.expanded}` : ''}${toggleButtonProps?.className ? ` ${toggleButtonProps.className}` : ''}`,
        });
    }

    const classNames = useGetClassesFromProps(
        props,
    );

    const clickTracker = useClickTracker(() => {
        setMenuIsVisible(false);
    });

    return <div
        ref={clickTracker}
        className={`${styles.dropdown}${menuIsVisible ? ` ${styles.expanded}` : ''}${classNames ? ` ${classNames}` : ''}`}
    >

        <SplitButton
            className={styles.button}
            position={position}
            items={dropdownItems}
        />

        {menuIsVisible && <Menu
            className={menuClassName}
            itemClassName={menuItemClassName}
            items={menuItems}
        />}

    </div>;
};

export default Dropdown;