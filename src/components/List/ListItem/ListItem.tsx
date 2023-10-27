import React, {
    forwardRef,
    ForwardedRef,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler,
} from 'react';

import styles from './ListItem.module.css';

export interface ListItemProps {
  className?: string | undefined;
  onMouseDown?: MouseEventHandler<HTMLLIElement> | undefined;
  onTouchStart?: TouchEventHandler<HTMLLIElement> | undefined;
  children?: ReactNode | undefined;
}

const ListItem = forwardRef((props: ListItemProps, ref?: ForwardedRef<HTMLLIElement> | undefined) => {

    const {
        className,
        onMouseDown,
        onTouchStart,
        children,
    } = props;

    return <li
        ref={ref}
        className={`${styles.listItem}${className ? ` ${className}` : ''}`}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
    >
        {children}
    </li>;
});

ListItem.displayName = 'ListItem';

export default ListItem;
