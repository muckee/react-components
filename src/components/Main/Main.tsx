import React from 'react';

import styles from './Main.module.css';

export interface MainProps {
  className?: string | undefined;
  children?: any;
}

const Main = (props: MainProps) => {
  return <main
    className={`${styles.main} ${props.className ? props.className : ''}`}
  >

    {props.children}

  </main>;
};

export default Main;