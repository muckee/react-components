import React, {
    ReactNode,
} from 'react';

import styles from './Header.module.css';

export interface HeaderProps {
    className?: string | undefined;
    children?: ReactNode | undefined;
}

const Header = (props: HeaderProps) => {
    return <header
        className={`${styles.header} ${props.className ? props.className : ''}`}>
        {props.children}
    </header>;
};

export default Header;
