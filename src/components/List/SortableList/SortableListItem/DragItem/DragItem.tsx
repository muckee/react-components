import React, {
    MouseEventHandler,
    ReactNode,
    RefObject,
    TouchEventHandler,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import ListItem from '../../../ListItem';
import DragDivider from './DragDivider';

import styles from './DragItem.module.css';

export type DragItemContextType = {
    dragIndex: number;
    setDragIndex: (dragIndex: number) => void;
    registerDragItem: (refInstance: RefObject<HTMLElement>, index: number) => void;
    overIndex: number;
    isDragging: boolean;
};

export type DragItemType = {
    refInstance: RefObject<HTMLElement>;
    order: number;
};

export type DragItemProps = {
    index: number;
    children: ReactNode;
    context: DragItemContextType;
    listeners?: { [key in string]: (MouseEventHandler | TouchEventHandler) };
    preview?: ReactNode;
    className?: string | undefined;
    previewClassName?: string | undefined;
    dividerClassName?: string | undefined;
};

const DragItem = (props: DragItemProps) => {

    const {
        index,
        children,
        context: {
            registerDragItem,
            dragIndex,
            overIndex,
            isDragging,
        },
        listeners,
        preview,
        className,
        previewClassName,
        dividerClassName,
    } = props;

    const wrapperRef = useRef<HTMLLIElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (previewRef.current) {
            previewRef.current.style.top = event.pageY + 'px';
            previewRef.current.style.left = event.pageX + 'px';
        }
    }, [previewRef]);

    useEffect(() => {
        registerDragItem(wrapperRef, index);
    }, [wrapperRef, registerDragItem, index]);

    useEffect(() => {
        if (preview && isDragging && dragIndex === index) {
            document.body.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (preview && isDragging && dragIndex === index) {
                document.body.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [preview, isDragging, handleMouseMove, dragIndex, index]);

    return (
        <ListItem
            ref={wrapperRef}
            {...(listeners ?? {})}
            className={`${styles.wrapper}${className ? ` ${className}` : ''}`}
        >
            {!!preview && isDragging && dragIndex === index && (
                <div
                    ref={previewRef}
                    className={`${styles.preview}${(isDragging && dragIndex === index) ? ` ${styles.dragging}` : ''}${className ? ` ${className}` : ''}${previewClassName ? ` ${previewClassName}` : ''}`}
                >
                    {preview}
                </div>
            )}

            {isDragging && overIndex === 0 && index === 0 && <DragDivider className={dividerClassName} align='top' />}

            {children}

            {isDragging && overIndex - 1 === index && <DragDivider className={dividerClassName} align='bottom' />}
        </ListItem>
    );
};

export default DragItem;