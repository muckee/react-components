import React, {
    Fragment,
    MouseEvent,
    ReactNode,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './Tooltip.module.css';

export interface TooltipProps {
    text: ReactNode;
    children: ReactNode;
    offset?: number | undefined;
}

const Tooltip = (props: TooltipProps) => {

    // TODO: The tooltip does not disappear if it is displayed, then the user right-clicks and moves the mouse out of the bounding box before left-clicking again. Fix this by adding a window event and always hiding the tooltip on clean-up.

    const {
        text,
        children,
    } = props;

    const tooltipRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLElement>(null);

    const [position, setPosition] = useState<{
        x: number;
        y: number;
    } | undefined>(undefined);

    const [positionHasChanged, setPositionHasChanged] = useState(false);

    const handleMouseOver = (
        e: MouseEvent<HTMLElement>,
    ) => {

        const anchorBounds = e.currentTarget.getBoundingClientRect();

        // Initially, the tooltip is positioned above its anchor

        const updatedX = anchorBounds.x;

        const updatedY = anchorBounds.y - anchorBounds.height;

        setPosition({
            x: updatedX,
            y: updatedY,
        });

        // TODO: Do something better than this...
        setPositionHasChanged(true);
    };

    useEffect(() => {

        if(positionHasChanged) {

            const anchorBounds = anchorRef.current?.getBoundingClientRect() || {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
    
            const tooltipWidth = tooltipRef.current?.getBoundingClientRect().width || 0;
            const tooltipHeight = tooltipRef.current?.getBoundingClientRect().height || 0;
    
            // Assign fallback values (left-hand side of anchor), overflowing downwards
            let updatedX = anchorBounds.x - tooltipWidth;
            // TODO: Maybe add margin size instead of tooltipHeight
            let updatedY = anchorBounds.y;

            // If the tooltip is below the viewport, move it up
            if(updatedY > (window.innerHeight - tooltipHeight)) {

                updatedY = anchorBounds.y + anchorBounds.height;
            }

            // If the tooltip is beyond the left-hand side of the viewport, move it up and right
            if(updatedX < 0) {
                console.log('Anchor outside of left bounds', {
                    position,
                    updatedX,
                    updatedY,
                });
                updatedX = anchorBounds.x;
                updatedY = anchorBounds.top - tooltipHeight;
            }

            // If the tooltip is beyond the top of the viewport, move it down and right
            if (updatedY < 0) {
                updatedX = anchorBounds.x + anchorBounds.width;
                updatedY = anchorBounds.y;
            }

            // If the tooltip is beyond the right-hand side of the viewport, move it down and left
            if(updatedX + tooltipWidth > window.innerWidth) {
                updatedX = anchorBounds.x;
                updatedY = anchorBounds.y + anchorBounds.height;
            }

            setPosition({
                x: updatedX,
                y: updatedY,
            });

            setPositionHasChanged(false);
        }

    }, [positionHasChanged]);

    const handleMouseLeave = () => setPosition(undefined);

    const anchorProps = {
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave,
        ref: anchorRef,
        
    };

    const anchor = isValidElement(children)
        ? cloneElement(children, {...anchorProps})
        : <span {...anchorProps}>{children}</span>;

    if(tooltipRef.current) {
        tooltipRef.current.style.top = `${position?.y || 0}px`;
        tooltipRef.current.style.left = `${position?.x || 0}px`;
    }

    useEffect(() => {

        if(tooltipRef.current) {
            tooltipRef.current.style.top = `${position?.y || 0}px`;
            tooltipRef.current.style.left = `${position?.x || 0}px`;
        }
    }, [
        tooltipRef.current,
        position,
    ]);

    return <Fragment>

        {anchor}

        {position && createPortal(
            <div
                ref={tooltipRef}
                className={styles.tooltipContainer}
            >
                <div
                    className={styles.tooltip}
                >
                    {text}
                </div>
            </div>,
            document.body,
        )}

    </Fragment>;
};

export default Tooltip;