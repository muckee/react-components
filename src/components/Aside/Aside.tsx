import React from 'react';

import styles from './Aside.module.css';

export interface AsideProps {
  className?: string | undefined;
  children?: any | undefined;
}

const Aside = (props: AsideProps) => {
  return <aside
    className={`${styles.aside}${props.className ? ` ${props.className}` : ''}`}
  >
    {props.children}
  </aside>;
};

export default Aside;