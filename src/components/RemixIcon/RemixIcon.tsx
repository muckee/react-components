import React from 'react';
import Icon from './Icon';

export interface RemixIconProps {
    icon: Icon;
}

const RemixIcon = (props: RemixIconProps) => {

    const {
        icon,
    } = props;

    return <i
        className={icon}
    ></i>;
};

export default RemixIcon;