import React from 'react';

import styles from './OrderedList.module.css';

const OrderedList = props => {
  return <ol
    className={`${styles.orderedList} ${props.className ? props.className : ''}`}
    reversed={props.reversed ? props.reversed : false}
    start={props.start && props.start}
  >
    {props.children}
  </ol>;
}

export default OrderedList;
