import React, { Fragment } from 'react';

import styles from './Spinner.module.css';

export interface SpinnerProps {
  isLoading?: boolean | undefined;
  loadingMessage?: string | undefined;
  type?: string | undefined;
}

const Spinner = (props: SpinnerProps) => {

    const { 
        isLoading,
        loadingMessage,
        type,
    } = props;

    let spinner;

    switch(type) {
        case 'radial':
            spinner = <div className={styles.radial}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        break;
        case 'none':
            spinner = '';
        break;
        case 'grid': // Swap the value of this cascading case, as well as the HTML elements assigned to `spinner`, with the preferred default spinner.
        default:
            spinner = <div className={styles.grid}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    }

    const loadingParagraph = <p className={styles.loading}>{loadingMessage ? loadingMessage : 'Loading'}</p>;

    return <Fragment>

        <div className={styles.spinnerContainer}>

            {spinner}

            {isLoading && loadingParagraph}

        </div>

    </Fragment>;
}

export default Spinner;