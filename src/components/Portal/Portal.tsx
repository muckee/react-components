import {
    // Fragment,
    ReactNode,
    // memo,
    useLayoutEffect,
    // useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    id: string;
    parentId?: string | undefined;
    className?: string | undefined;
    children?: ReactNode | undefined;
}

const Portal = (props: PortalProps) => {

    const {
        id,
        // parentId = 'thugnerdz-default-portal',
        children,
    } = props;

    const [element, setElement] = useState<HTMLElement | null>(null);

    // const [isDynamic] = useState(!element.parentElement);

    // console.debug('parent element : ', document.getElementById(id));
    // console.debug('is falsy', !document.getElementById(id));

    // if (!element) {
    //     element = document.createElement('div');
    //     element.setAttribute('id', id);
    //     document.body.appendChild(element);
    // }

    useLayoutEffect(() => {
        let updatedElement = document.getElementById(id);

        let elementCreatedDynamically = false;

        if (updatedElement === null) {
            updatedElement = document.createElement('div');
            updatedElement.setAttribute('id', id);
            document.body.appendChild(updatedElement);
            elementCreatedDynamically = true;
        }

        setElement(updatedElement);

        return () => {
            // delete the programatically created element
            if (elementCreatedDynamically && updatedElement?.parentNode) {
                updatedElement.parentNode.removeChild(updatedElement);
            }
        };

    }, [id]);

    if (element === null) {
        return '';
    }

    return createPortal(children, element);
};

export default Portal;

// const Portal = (props: PortalProps) => {

//     const {
//         children,
//         className,
//         id,
//         parentId,
//     } = props;

//     let parentElement = document.getElementById(id);

//     console.debug('parent element', parentElement);

//     if (!parentElement) {
//         parentElement = document.createElement('div');
//     }

//     const rootElement = useRef(parentElement);

//     // // Find or create the root element
//     // const rootElement = useRef((id ? document.getElementById(id) : null) || document.createElement('div'));

//     // Assign any supplied classes to the root element
//     if (className) {
//         rootElement.current.classList.add(className);
//     }

//     const [isDynamic] = useState(!rootElement.current.parentElement);

//     useLayoutEffect(() => {

//         if (isDynamic) {

//             rootElement.current.id = id;

//             if (parentId) {

//                 const parentEl = document.getElementById(parentId);

//                 parentEl?.appendChild(rootElement.current);

//             } else {

//                 document.body.appendChild(rootElement.current);
//             }
//         }

//         return () => {

//             if (isDynamic && rootElement.current.parentElement) {

//                 rootElement.current.parentElement.removeChild(rootElement.current);
//             }
//         };
//     }, [id]);

//     return createPortal(children, rootElement.current);
// };

// export default memo(Portal);