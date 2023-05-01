import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';
import Button from "../Button/Button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from './Modal.module.css';
import Section from "../Section/Section";

const Modal = props => {

    return <Fragment>
        
        {ReactDOM.createPortal(
            <Backdrop onClick={props.handleClose} className={props.show ? styles.visible : ''} />,
            document.getElementById(props.backdropPortalId)
        )}
        {ReactDOM.createPortal(
            <div className={`${styles.modal} ${props.show ? styles.visible : ''} ${props.className ? props.className : ''}`}>

                <Section className={`${styles.modalMain}${props.mainClassName ? ' ' + props.mainClassName : ''}`}>

                    {props.heading && <Header>
                        <Button type="button" className={styles.closeButton} onClick={props.handleClose}>
                            Close
                        </Button>
                        <h2>{props.heading}</h2>
                    </Header>}

                    <Section className={props.contentClassName && props.contentClassName}>
                        {props.children}
                    </Section>

                    {!props.heading && <Footer>
                        <Button type="button" onClick={props.handleClose}>
                            Close
                        </Button>
                    </Footer>}

                </Section>
            </div>,
            document.getElementById(props.overlayPortalId)
        )}
    </Fragment>;
};

export default Modal;