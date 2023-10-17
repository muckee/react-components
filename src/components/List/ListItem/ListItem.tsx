import React, {
    ReactNode,
} from 'react';

import styles from './ListItem.module.css';

export interface ListItemProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const ListItem = (props: ListItemProps) => {
    return <li
        className={`${styles.listItem}${props.className ? ` ${props.className}` : ''}`}
    >
        {props.children}
    </li>;
};

export default ListItem;
