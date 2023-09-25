import React, {
    cloneElement,
    Fragment,
    useState,
} from 'react';
import Portal from '../Portal';
import styles from './Tooltip.module.css';

export interface TooltipProps {
    text: string;
    title?: string | undefined;
    className?: string | undefined;
    headingClassName?: string | undefined;
    textClassName?: string | undefined;
    children: any;
};

const NewTooltip = (props: TooltipProps) => {

    const {
        title,
        text,
        className,
        headingClassName,
        textClassName,
        children,
    } = props;

    const [isVisible, setIsVisible] = useState(false);

    const updatedChildren = cloneElement(children, {
        onMouseOver: () => setIsVisible(true),
        onMouseOut: () => setIsVisible(false),
    });

    return <Fragment>

        {updatedChildren}

        {isVisible ?? <Portal id={`thugnerdz-tooltip-root`}>

            <div
                className={`${styles.tooltip}${className ? ` ${className}` : ''}`}
            >

                {title ?? <Fragment>

                    <h5
                        className={headingClassName}
                    >{title}</h5>
                    <hr />

                </Fragment>}

                <p
                    className={textClassName}
                >{text}</p>

            </div>

        </Portal>}

    </Fragment>;
};

export default NewTooltip;