import React, {
    ReactNode,
} from 'react';

import styles from './Section.module.css';

export interface SectionProps {
    id?: string | undefined;
    className?: string | undefined;
    children?: ReactNode | undefined;
}

const Section = (props: SectionProps) => {

    const {
        id,
        className,
        children,
    } = props;

    return <section
        id={id}
        className={`${styles.section}${className ? ` ${className}` : ''}`}
    >
        {children}
    </section>;
};

export default Section;