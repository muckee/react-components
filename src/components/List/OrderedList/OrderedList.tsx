import React from 'react';

import styles from './OrderedList.module.css';

export interface OrderedListProps {
  className?: string | undefined;
  reversed?: boolean | undefined;
  start?: number | undefined;
  children?: any;
}

const OrderedList = (props: OrderedListProps) => {
  return <ol
    className={`${styles.orderedList} ${props.className ? props.className : ''}`}
    reversed={props.reversed ? props.reversed : false}
    start={props.start && props.start}
  >
    {props.children}
  </ol>;
}

export default OrderedList;
