import {
    useEffect,
    useRef,
} from 'react';

const useClickTracker = (onClickOutside: () => void) => {

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const handleClickOutside: EventListener = (e) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [ref]);

    return ref;
};

export default useClickTracker;