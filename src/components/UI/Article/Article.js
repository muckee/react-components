import React from 'react';

import styles from './Article.module.css';

const Article = props => {

  let heading = props.heading ? <h2 className={styles.title}>{props.heading}</h2> : '';

  if(props.headingSize) {
    switch(props.headingSize) {
      case '1':
        heading = <h1 className={styles.title}>{props.heading}</h1>;
        break;
      case '2':
        heading = <h2 className={styles.title}>{props.heading}</h2>;
        break;
      case '3':
        heading = <h3 className={styles.title}>{props.heading}</h3>;
        break;
      case '4':
        heading = <h4 className={styles.title}>{props.heading}</h4>;
        break;
      case '5':
        heading = <h5 className={styles.title}>{props.heading}</h5>;
        break;
      case '6':
        heading = <h6 className={styles.title}>{props.heading}</h6>;
        break;
      default:
        heading = <h2 className={styles.title}>{props.heading}</h2>;
    }
  }
  return <article
    className={`${styles.article} ${props.className ? props.className : ''}`}
  >

    {heading}

    {props.children}

  </article>;
};

export default Article;