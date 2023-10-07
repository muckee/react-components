import React from 'react';
import Menu from '../../../Menu';
import Button, {
    ButtonProps,
    getClassNamesFromProps,
} from '../../Button';

import parentStyles from '../SplitButton.module.css';

import styles from './SplitButtonMenu.module.css';

export interface MenuProps {
    menuItems?: ButtonProps[] | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
}

const SplitButtonMenu = (props: MenuProps) => {

    const {
        menuItems = [],
        className,
        disabled,
    } = props;

    return <Menu
        className={`${styles.menu}${className ? ` ${className}` : ''}${disabled ? ` ${styles.disabled}` : ''}`}
        items={menuItems ? menuItems.map((item: ButtonProps, idx: number) => {
            return <Button
                key={idx}
                {...{
                    ...item,
                    className: `${styles.menuItem}${getClassNamesFromProps(item, parentStyles)}${item.disabled ? ` ${styles.disabled}` : ''}${item.className ? ` ${item.className}` : ''}`,
                    disabled: item.disabled ? item.disabled : disabled, // If item is not disabled, pass `props.disabled` from parent
                }}
            />;
        }) : []}
    />;
};

export default SplitButtonMenu;