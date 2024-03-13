import React, {
    ReactNode,
} from 'react';

import styles from './Figure.module.css';

export interface FigureProps {
  className?: string | undefined;
  heading?: string | undefined;
  figcaptionClassName?: string | undefined;
  shiftCaptionUp?: boolean | undefined;
  imgSrc?: string | undefined;
  imgAlt?: string | undefined;
  imgClassName?: string | undefined;
  children?: ReactNode | undefined;
}

const Figure = (props: FigureProps) => {

    const {
        className,
        heading,
        figcaptionClassName,
        shiftCaptionUp,
        imgSrc,
        imgAlt,
        imgClassName,
        children,
    } = props;

    return (
        <figure className={`${styles.figure}${className ? ` ${className}` : ''}`}>

            {heading && heading}

            {shiftCaptionUp && <figcaption className={figcaptionClassName}>{children}</figcaption>}

            <img
                src={imgSrc}
                alt={imgAlt}
                className={`${styles.image}${imgClassName ? ` ${imgClassName}` : ''}`}
            />

            {!shiftCaptionUp && <figcaption className={figcaptionClassName}>{children}</figcaption>}

        </figure>
    );
};

export default Figure;