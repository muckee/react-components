import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = props => {
    return <div
        className={`${styles.backdrop} ${props.className ? props.className : ''}`} onClick={props.onClick}
    />;
};

export default Backdrop;