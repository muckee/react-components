import React, {
    ReactNode,
} from 'react';

import styles from './UnorderedList.module.css';

export interface UnorderedListProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const UnorderedList = (props: UnorderedListProps) => {
    return <ul
        className={`${styles.unorderedList} ${props.className ? props.className : ''}`}
    >
        {props.children}
    </ul>;
};

export default UnorderedList;
