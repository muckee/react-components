import {
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    DragItemType,
    DragItemContextType,
} from '@components/List/SortableList/SortableListItem/DragItem';

const between = (x: number, from: number, to: number) => x > from && x < to;

const aggregateTouchAndMouseEvent = (event: EventListenerOrEventListenerObject): Partial<TouchInit | MouseEventInit> => {
    let clientY;
    if (window.TouchEvent && event instanceof TouchEvent) {
        const touchEvent = event as unknown as TouchEvent;
        clientY = touchEvent.touches[0].clientY;
    } else if (event instanceof MouseEvent) {
        const mouseEvent = event as unknown as MouseEvent;
        clientY = mouseEvent.clientY;
    }
    return {
        clientY,
    };
};

export const useDragItemContext = ({
    onDrop,
    snapThreshold = 24,
}: {
    onDrop: (dragIndex: number, overIndex: number) => void;
    snapThreshold?: number;
}) => {
    const [dragIndex, setDragIndex] = useState<number>(-1);
    const [overIndex, setOverIndex] = useState(-1);
    const [items, setItems] = useState<DragItemType[]>([]);
    const [doesMouseMoved, setDoesMouseMoved] = useState(false);
    const [mousePressedY, setMousePressedY] = useState<number | undefined>();
    const isDragging = dragIndex !== -1 && doesMouseMoved;

    const onMove = useCallback((event: EventListenerOrEventListenerObject) => {
        // event.preventDefault();

        const { clientY } = aggregateTouchAndMouseEvent(event);

        const hasMovedEnough = mousePressedY !== undefined && clientY !== undefined && Math.abs(mousePressedY - clientY) > 5;
        if (hasMovedEnough) {
            setDoesMouseMoved(true);
        }

        if (isDragging && !!items.length) {
            const sortedItems = [...items].sort((a, b) => a.order - b.order);
            let points = sortedItems
                .map((item) => {
                    const node = item.refInstance.current;
                    const { y, height } = node?.getBoundingClientRect() ?? { y: 0, height: 0 };
                    return y + height;
                });

            const node = sortedItems[0].refInstance.current;
            const { y } = node?.getBoundingClientRect() ?? { y: 0, height: 0 };
            points = [y, ...points];
            const newOrder = points.findIndex((point) => {
                const from = point - snapThreshold;
                const to = point + snapThreshold;

                return clientY !== undefined && between(clientY, from, to);
            });

            setOverIndex(newOrder);
        }
    }, [isDragging, items, snapThreshold, mousePressedY]);

    const onMouseUp = useCallback(() => {
        setDragIndex(-1);
        setOverIndex(-1);

        setDoesMouseMoved(false);
        setMousePressedY(undefined);

        if (overIndex === -1) return;
        let indexShift = 0;
        if (dragIndex < overIndex) {
            indexShift = -1;
        }
        onDrop(dragIndex, overIndex + indexShift);
    }, [dragIndex, overIndex, onDrop]);

    const onMouseDown = useCallback((event: EventListenerOrEventListenerObject) => {
        const mouseEvent = event as unknown as MouseEvent;
        setMousePressedY(mouseEvent.clientY);
    }, []) as unknown as EventListenerOrEventListenerObject;

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onMouseUp);

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('touchstart', onMouseDown);

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchend', onMouseUp);

            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('touchstart', onMouseDown);
        };
    }, [onMouseUp]);

    useEffect(() => {
        document.body.style.cursor = isDragging ? 'row-resize' : 'initial';
    }, [isDragging]);

    const registerDragItem = useCallback((refInstance: RefObject<HTMLElement>, order: number) => {
        setItems((items) => {
            if (items.some((_, i) => i === order)) {
                return items
                    .map((item, i) => {
                        if (i === order) {
                            return {
                                refInstance,
                                order,
                            };
                        } else {
                            return item;
                        }
                    });
            } else {
                return [...items, { refInstance, order }];
            }
        });
    }, []);

    useEffect(() => {

        document.body.addEventListener('mousemove', onMove as unknown as EventListenerOrEventListenerObject);
        document.body.addEventListener('touchmove', onMove as unknown as EventListenerOrEventListenerObject, { passive: false });

        return () => {

            document.body.removeEventListener('mousemove', onMove as unknown as EventListenerOrEventListenerObject);
            document.body.removeEventListener('touchmove', onMove as unknown as EventListenerOrEventListenerObject);
        };
    }, [onMove]);

    const context = useMemo<DragItemContextType>(() => ({
        dragIndex,
        setDragIndex,
        registerDragItem,
        overIndex,
        isDragging,
    }), [dragIndex, registerDragItem, overIndex, isDragging]);

    return context;
};