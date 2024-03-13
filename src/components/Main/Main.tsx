import React, {
    forwardRef,
    ForwardedRef,
    ReactNode,
} from 'react';

import styles from './Main.module.css';

export interface MainProps {
    className?: string | undefined;
    children?: ReactNode | undefined;
}

const Main = forwardRef(function Main(props: MainProps, ref?: ForwardedRef<HTMLElement> | undefined) {

    const {
        className,
        children,
    } = props;

    return <main
        ref={ref}
        className={`${styles.main} ${className ? className : ''}`}
    >

        {children}

    </main>;

});

export default Main;