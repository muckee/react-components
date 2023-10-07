import React, {
    ReactNode,
} from 'react';

import styles from './Article.module.css';

export interface ArticleProps {
  heading?: string | undefined;
  headingSize?: number | string | undefined;
  className?: string | undefined;
  children?: ReactNode | undefined;
}

const Article = (props: ArticleProps) => {

    const {
        heading,
        headingSize,
        className,
        children,
    } = props;

    let htmlHeading: ReactNode | undefined = heading ? <h2 className={`${styles.title}`}>{heading}</h2> : undefined;

    if(headingSize) {
        switch(headingSize.toString()) {
        case '1':
            htmlHeading = <h1 className={`${styles.title}`}>{heading}</h1>;
            break;
        case '2':
            htmlHeading = <h2 className={`${styles.title}`}>{heading}</h2>;
            break;
        case '3':
            htmlHeading = <h3 className={`${styles.title}`}>{heading}</h3>;
            break;
        case '4':
            htmlHeading = <h4 className={`${styles.title}`}>{heading}</h4>;
            break;
        case '5':
            htmlHeading = <h5 className={`${styles.title}`}>{heading}</h5>;
            break;
        case '6':
            htmlHeading = <h6 className={`${styles.title}`}>{heading}</h6>;
            break;
        default:
            htmlHeading = <h2 className={`${styles.title}`}>{heading}</h2>;
        }
    }
    return <article
        className={`${styles.article}${className ? ` ${className}` : ''}`}
    >

        {htmlHeading}

        {children}

    </article>;
};

export default Article;