import React, {
    forwardRef,
    ForwardedRef,
    ReactNode,
} from 'react';

import styles from './OrderedList.module.css';

export interface OrderedListProps {
    className?: string | undefined;
    reversed?: boolean | undefined;
    start?: number | undefined;
    children?: ReactNode | undefined;
}

const OrderedList = forwardRef((props: OrderedListProps, ref?: ForwardedRef<HTMLOListElement> | undefined) => {
    const {
        reversed,
        start,
        className,
        children,
    } = props;

    return <ol
        ref={ref}
        className={`${styles.orderedList} ${className ? className : ''}`}
        reversed={reversed ? reversed : false}
        start={start && start}
    >
        {children}
    </ol>;
});

OrderedList.displayName = 'OrderedList';

export default OrderedList;
