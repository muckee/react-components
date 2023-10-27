import React, {
    ReactNode,
} from 'react';
import DragItem, {
    DragItemContextType,
} from './DragItem';

export interface SortableListItemProps {
    index: number;
    context: DragItemContextType;
    preview?: ReactNode | string | undefined;
    className?: string | undefined;
    children?: ReactNode | string | undefined;
}

const SortableListItem = (props: SortableListItemProps) => {

    const {
        index,
        context,
        preview,
        className,
        children,
    } = props;

    return <DragItem
        index={index}
        context={context}
        preview={preview}
        className={className}
    >
        {children}
    </DragItem>;
};

export default SortableListItem;