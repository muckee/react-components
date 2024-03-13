import { DragItemContextType } from '@components/List/SortableList/SortableListItem/DragItem';

const useDragItem = (context: DragItemContextType, index: number) => {

    const { setDragIndex } = context;
    const handler = () => setDragIndex(index);
    const listeners = {
        onMouseDown: handler,
        onTouchStart: handler,
    };

    const isDragging = context.isDragging && index === context.dragIndex;

    return {
        listeners,
        isDragging,
    };
};

export default useDragItem;