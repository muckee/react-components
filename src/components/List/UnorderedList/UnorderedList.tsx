import React from 'react';

import styles from './UnorderedList.module.css';

export interface UnorderedListProps {
  className?: string | undefined;
  children?: any;
}

const UnorderedList = (props: UnorderedListProps) => {
  return <ul
    className={`${styles.unorderedList} ${props.className ? props.className : ''}`}
  >
    {props.children}
  </ul>;
}

export default UnorderedList;
