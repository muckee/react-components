import React, {
    MouseEventHandler,
    TouchEventHandler,
} from 'react';
import {
    Status,
} from '@application/hooks';
import RemixIcon, {
    Editor,
} from '@application/components/RemixIcon';
import Button, {
    ButtonProps,
} from '@application/components/Button';

import styles from './DragHandle.module.css';

export interface DragHandleProps extends ButtonProps {
    listeners: {
        onMouseDown: MouseEventHandler<HTMLButtonElement>;
        onTouchStart: TouchEventHandler<HTMLButtonElement>;
    },
    dragHandleClassName?: string | undefined;
}

const DragHandle = (props: DragHandleProps) => {

    const {
        listeners,
        title,
        className,
        dragHandleClassName,
        status,
        ...buttonProps
    } = props;

    return <Button
        {...listeners}
        {...{
            ...buttonProps,
            title: title ? title : 'Re-position layer',
            className: `${styles.dragHandleButton}${className ? ` ${className}` : ''}`,
            status: status ? status : Status.Secondary,
        }}
    >
        <RemixIcon
            icon={Editor.Draggable}
            className={`${styles.dragHandle}${dragHandleClassName ? ` ${dragHandleClassName}` : ''}`}
        />
    </Button>;
};

export default DragHandle;