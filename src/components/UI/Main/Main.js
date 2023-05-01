import React from 'react';

import styles from './Main.module.css';

const Main = props => {
  return <main
    className={`${styles.main} ${props.className ? props.className : ''}`}
  >

    {props.children}

  </main>;
};

export default Main;