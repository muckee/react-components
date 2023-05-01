import React from 'react';

import styles from './Footer.module.css';

const Footer = props => {

  return <footer
    data-testid={`footer`}
    className={`${styles.footer} ${props.className ? props.className : ''}`}
  >

    {props.children}

  </footer>;
};

export default Footer;