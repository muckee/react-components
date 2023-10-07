import React, {
    ReactNode,
} from 'react';

import styles from './Section.module.css';

export interface SectionProps {
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const Section = (props: SectionProps) => {
    return <section
        className={`${styles.section}${props.className ? ` ${props.className}` : ''}`}
    >
        {props.children}
    </section>;
};

export default Section;