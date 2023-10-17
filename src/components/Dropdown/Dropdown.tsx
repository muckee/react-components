import React, {
    ReactNode,
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
import { SplitButtonPosition } from '../Button/SplitButton/SplitButton';
import { SelectedOption } from '../Form/Input/Select/SelectedOptionButton';
import {
    useClassNames,
    useClickTracker,
} from '../../hooks';

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
    status?: ButtonStatus | undefined;
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
    } = props;

    const classNames = useClassNames(props);

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
            items={[
                {
                    children: children,
                    ...buttonProps,
                    onClick: (e) => {
                        if(buttonTogglesMenu) {
                            setMenuIsVisible(!menuIsVisible);
                        }
                        if(buttonProps?.onClick) {
                            buttonProps.onClick(e);
                        }
                    },
                    className: `${styles.primaryButton}${menuIsVisible ? ` ${styles.expanded}` : ''}${buttonProps?.className ? ` ${buttonProps.className}` : ''}`,
                },
                {
                    children: menuIsVisible ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />,
                    onClick: () => setMenuIsVisible(!menuIsVisible),
                    ...toggleButtonProps,
                    className: `${styles.toggleButton}${menuIsVisible ? ` ${styles.expanded}` : ''}${toggleButtonProps?.className ? ` ${toggleButtonProps.className}` : ''}`,
                },
            ]}
        />

        {menuIsVisible && <Menu
            className={menuClassName}
            itemClassName={menuItemClassName}
            items={menuItems}
        />}

    </div>;
};

export default Dropdown;