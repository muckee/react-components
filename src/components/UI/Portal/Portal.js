import { memo } from "react";
import { createPortal } from "react-dom";

const Portal = props => {

    const {
        id,
        children,
    } = props;

    const rootElement = useRef(document.getElementById(id) || document.createElement('div'));

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