import React, {
    ReactNode,
} from 'react';

import styles from './Footer.module.css';

export interface FooterProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const Footer = (props: FooterProps) => {

    return <footer
        className={`${styles.footer}${props.className ? ` ${props.className}` : ''}`}
    >

        {props.children}

    </footer>;
};

export default Footer;