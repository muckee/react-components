import React from 'react';

import styles from './Footer.module.css';

export interface FooterProps {
  className?: string | undefined;
  children?: any;
}

const Footer = (props: FooterProps) => {

  return <footer
    data-testid={`footer`}
    className={`${styles.footer}${props.className ? ` ${props.className}` : ''}`}
  >

    {props.children}

  </footer>;
};

export default Footer;