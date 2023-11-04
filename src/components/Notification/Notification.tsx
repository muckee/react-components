import React, {
    ReactNode,
} from 'react';
import {
    useGetClassesFromProps,
    Status,
} from '@application/hooks';

import styles from './Notification.module.css';

export interface NotificationProps {
    status?: Status | undefined;
    className?: string | undefined;
    disabled?: boolean | undefined;
    children?: ReactNode | undefined;
}

const Notification = (props: NotificationProps) => {

    const {
        children,
    } = props;

    const classNames = useGetClassesFromProps({
        ...props,
    } as typeof props);

    return <p
        className={`${styles.default}${classNames ? ` ${classNames}` : ''}`}
    >{children}</p>;
};

export default Notification;