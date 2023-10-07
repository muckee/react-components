import React, {
    ReactNode,
} from 'react';

import styles from './Aside.module.css';

export interface AsideProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const Aside = (props: AsideProps) => {
    return <aside
        className={`${styles.aside}${props.className ? ` ${props.className}` : ''}`}
    >
        {props.children}
    </aside>;
};

export default Aside;