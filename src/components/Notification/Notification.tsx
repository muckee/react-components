import React, {
    ReactNode,
} from 'react';
import useGetClassesFromProps from '@application/hooks/useGetClassesFromProps/use-get-classes-from-props';

import styles from './Notification.module.css';
import { ButtonStatus } from '../Button/Button';

export interface NotificationProps {
    status?: ButtonStatus | undefined;
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