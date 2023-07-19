import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../Tooltip/Tooltip';

import styles from './Figure.module.css';

export interface FigureProps {
  className?: string | undefined;
  heading?: string | undefined;
  shiftCaptionUp?: boolean | undefined;
  imgSrc?: string | undefined;
  imgAlt?: string | undefined;
  imgClassName?: string | undefined;
  imgStyle?: React.CSSProperties | undefined;
  tooltip?: string | undefined;
  children?: any;
}

const Figure = (props: FigureProps) => {

  const {
    className,
    heading,
    shiftCaptionUp,
    imgSrc,
    imgAlt,
    imgClassName,
    imgStyle,
    tooltip,
    children,
  } = props;

  return (
    <figure className={`${styles.figure}${className ? ` ${className}` : ''}`}>

      {heading && heading}

      {shiftCaptionUp && <figcaption>{children}</figcaption>}

      {tooltip ? <Tooltip>
        <TooltipTrigger className={styles.tooltipTrigger}><img
          data-tooltip-id={tooltip ? `${imgAlt}-tooltip` : undefined}
          src={imgSrc}
          alt={imgAlt}
          className={`${styles.image}${imgClassName ? ` ${imgClassName}` : ''}`}
          style={imgStyle ? imgStyle : {}}
        /></TooltipTrigger>
        <TooltipContent className={styles.tooltipContent}>{tooltip}</TooltipContent>
      </Tooltip> : <img
        data-tooltip-id={tooltip ? `${imgAlt}-tooltip` : undefined}
        src={imgSrc}
        alt={imgAlt}
        className={`${styles.image}${imgClassName ? ` ${imgClassName}` : ''}`}
        style={imgStyle ? imgStyle : {}}
      />}

      {!shiftCaptionUp && <figcaption>{children}</figcaption>}

    </figure>
  );
};

export default Figure;