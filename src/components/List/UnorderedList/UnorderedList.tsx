import React, {
    MouseEventHandler,
    ReactNode,
} from 'react';

import styles from './UnorderedList.module.css';

export interface UnorderedListProps {
  className?: string | undefined;
  onMouseLeave?: MouseEventHandler<HTMLUListElement> | undefined;
  onMouseOver?: MouseEventHandler<HTMLUListElement> | undefined;
  children?: ReactNode | undefined;
}

const UnorderedList = (props: UnorderedListProps) => {

    const {
        className,
        onMouseLeave,
        onMouseOver,
        children,
    } = props;

    return <ul
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        className={`${styles.unorderedList}${className ? ` ${className}` : ''}`}
    >
        {children}
    </ul>;
};

export default UnorderedList;
