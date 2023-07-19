import React from 'react';

import styles from './ListItem.module.css';

export interface ListItemProps {
  className?: string | undefined;
  children?: any;
}

const ListItem = (props: ListItemProps) => {
  return <li
    className={`${styles.listItem} ${props.className ? props.className : ''}`}
  >
    {props.children}
  </li>;
}

export default ListItem;
