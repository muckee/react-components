import React from 'react';

import styles from './Backdrop.module.css';

export interface BackdropProps {
  className?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Backdrop = (props: BackdropProps) => {

    return <div
        className={`${styles.backdrop}${props.className ? ` ${props.className}` : ''}`} onClick={props.onClick}
    />;
};

export default Backdrop;