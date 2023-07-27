import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  id: string;
  className?: string | undefined;
  children?: any;
}

const Portal = (props: PortalProps) => {

    const {
        id,
        className,
        children,
    } = props;

    const rootElement = useRef((id ? document.getElementById(id) : null) || document.createElement('div'));

    if(className) {
        rootElement.current.classList.add(className);
    }
    const [isDynamic] = useState(!rootElement.current.parentElement);

    useEffect(() => {

        if (isDynamic) {
            rootElement.current.id = id;
            document.body.appendChild(rootElement.current);
        }

        return () => {
            if (isDynamic && rootElement.current.parentElement) {
                rootElement.current.parentElement.removeChild(rootElement.current);
            }
        }
    }, [id]);

    return createPortal(children, rootElement.current);
}

export default memo(Portal);