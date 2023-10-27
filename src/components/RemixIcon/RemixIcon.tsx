import React from 'react';
import Icon from './Icon';

export type RemixIconSize = 'fw' | 'xxs' | 'xs' | 'sm' | '1x' | 'lg' | 'xl' | '2x' | '3x' | '10x';

export interface RemixIconProps {
    icon: Icon;
    size?: RemixIconSize | undefined;
    className?: string | undefined;
}

const RemixIcon = (props: RemixIconProps) => {

    const {
        icon,
        size,
        className,
    } = props;

    return <i
        className={`${icon}${size ? ` ri-${size}` : ''}${className ? ` ${className}` : ''}`}
    ></i>;
};

export default RemixIcon;