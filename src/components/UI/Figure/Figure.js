import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '../Tooltip/Tooltip';

import styles from './Figure.module.css';

const Figure = props => {

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
    <figure className={`${styles.figure} ${className ? className : ''}`}>

      {heading && heading}

      {shiftCaptionUp && <figcaption>{children}</figcaption>}

      {tooltip ? <Tooltip>
        <TooltipTrigger className={styles.tooltipTrigger}><img
          data-tooltip-id={tooltip ? `${imgAlt}-tooltip` : undefined}
          src={imgSrc}
          alt={imgAlt}
          className={`${styles.image}${imgClassName ? ' ' + imgClassName : ''}`}
          style={imgStyle ? imgStyle : {}}
        /></TooltipTrigger>
        <TooltipContent className={styles.tooltipContent}>{tooltip}</TooltipContent>
      </Tooltip> : <img
        data-tooltip-id={tooltip ? `${imgAlt}-tooltip` : undefined}
        src={imgSrc}
        alt={imgAlt}
        className={`${styles.image}${imgClassName ? ' ' + imgClassName : ''}`}
        style={imgStyle ? imgStyle : {}}
      />}

      {!shiftCaptionUp && <figcaption>{children}</figcaption>}

    </figure>
  );
};

export default Figure;