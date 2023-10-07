import React, {
    ReactNode,
} from 'react';

import styles from './OrderedList.module.css';

export interface OrderedListProps {
  className?: string | undefined;
  reversed?: boolean | undefined;
  start?: number | undefined;
  children?: ReactNode | undefined;
}

const OrderedList = (props: OrderedListProps) => {
    return <ol
        className={`${styles.orderedList} ${props.className ? props.className : ''}`}
        reversed={props.reversed ? props.reversed : false}
        start={props.start && props.start}
    >
        {props.children}
    </ol>;
};

export default OrderedList;
