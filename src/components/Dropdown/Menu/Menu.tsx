import React, {
    ReactNode,
} from 'react';
import DefaultMenu from '../../Menu';

import styles from './Menu.module.css';

export interface MenuProps {
    items: (ReactNode | string)[] | undefined;
    className?: string | undefined;
    itemClassName?: string | undefined;
}

// TODO: Get menu item height
// TODO: Set height of menu to combined height of max rows (5)
// TODO: Set overflow-x to scroll
// TODO: If menu falls outside viewport boundary, attempt to reposition it

const Menu = (props: MenuProps) => {

    const {
        className,
        itemClassName,
        items,
    } = props;

    if(((items?.length || 0) < 1) ) {
        return <div
            className={`${styles.menu} ${styles.cursorReset}${className ? ` ${className}` : ''}`}
        >No options available</div>;
    }

    return <DefaultMenu
        className={`${styles.menu}${className ? ` ${className}` : ''}`}
        itemClassName={itemClassName}
        items={items}
    />;
};

export default Menu;