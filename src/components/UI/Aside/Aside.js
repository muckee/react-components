import React from 'react';

import styles from './Aside.module.css';

const Aside = props => {
  return <aside
    className={`${styles.Aside} ${props.className ? props.className : ''}`}
  >
    {props.children}
  </aside>;
};

export default Aside;