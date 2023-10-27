import React, {
    useEffect,
    useRef,
} from 'react';

import styles from './DragDivider.module.css';

export type DragDividerProps = {
    className?: string;
    height?: number;
    align: 'top' | 'bottom';
};

export const alignDivider = (height: number, align: ('top' | 'bottom')) => {

    // return `${(height / 2) + (align === 'top' ? -1 : 0)}`;

    const position = height / 2;

    switch(align) {
    case 'top': {
        return position - 1;
    }
    case 'bottom':
    default: {
        return position;
    }
    }
};

const DragDivider = (props: DragDividerProps) => {

    const {
        className,
        height = 2,
        align,
    } = props;

    const dividerRef = useRef<HTMLDivElement>(null);

    const updateDividerAlignment = () => {
        if (dividerRef.current) {
            dividerRef.current.style[align] = `${alignDivider(height, align)}`;
            dividerRef.current.style.height = `${height}px`;
        }
    };

    useEffect(updateDividerAlignment, [dividerRef.current]);

    updateDividerAlignment();

    return (
        <div
            ref={dividerRef}
            className={`${styles.divider}${className ? ` ${className}` : ''}`}
        />
    );
};

export default DragDivider;