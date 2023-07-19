import React from 'react';

import styles from './Section.module.css';

export interface SectionProps {
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
  children?: any;
}

const Section = (props: SectionProps) => {
  return <section
    style={props.style}
    className={`${styles.section}${props.className ? ` ${props.className}` : ''}`}
  >
    {props.children}
  </section>;
};

export default Section;