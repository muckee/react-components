import React, {
    ReactNode,
    useRef,
} from 'react';
import OrderedList from '../OrderedList';

import styles from './SortableList.module.css';

export interface SortableListProps {
    items?: ReactNode[] | undefined;
    className?: string | undefined;
}
const SortableList = (props: SortableListProps) => {

    const {
        items,
        className,
    } = props;

    const containerRef = useRef<HTMLOListElement>(null);

    return <OrderedList
        ref={containerRef}
        className={`${styles.list}${className ? ` ${className}` : ''}`}
    >

        {items}

    </OrderedList>;
};

export default SortableList;