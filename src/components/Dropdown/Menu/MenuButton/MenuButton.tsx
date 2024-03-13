import React from 'react';
import Button, {
    ButtonProps,
} from '@components/Button';

import styles from './MenuButton.module.css';

const MenuButton = (props: ButtonProps) => {

    const {
        className,
    } = props;

    return <Button
        {...{
            ...props,
            className: `${styles.button}${className ? ` ${className}` : ''}`
        }}
    />;
};

export default MenuButton;