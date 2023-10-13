import React, {
    ReactNode,
} from 'react';
import DefaultMenu from '../../Menu';

import styles from './Menu.module.css';

export interface MenuProps {
    items: ReactNode[] | string[] | (ReactNode | string)[] | undefined;
    className?: string | undefined;
}

// TODO: Get menu item height
// TODO: Set height of menu to combined height of max rows (5)
// TODO: Set overflow-x to scroll
// TODO: If menu falls outside viewport boundary, attempt to reposition it

const Menu = (props: MenuProps) => {

    const {
        className,
        items,
    } = props;

    if(((items?.length || 0) < 1) ) {
        return <div
            className={`${styles.menu}${className ? ` ${className}` : ''}`}
        >No options available</div>;
    }

    return <DefaultMenu
        className={`${styles.menu}${className ? ` ${className}` : ''}`}
        items={items}
    />;
};

export default Menu;