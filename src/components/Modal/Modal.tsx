import React, {
    Fragment,
    ReactNode,
} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Portal from '../Portal/Portal';
import Section from '../Section/Section';

import styles from './Modal.module.css';

export interface ModalProps {
  handleClose: () => void;
  show?: boolean | undefined;
  className?: string | undefined;
  mainClassName?: string | undefined;
  contentClassName?: string | undefined;
  heading?: string | undefined;
  children?: ReactNode | undefined;
}

const Modal = (props: ModalProps) => {

    const backdropPortalId = 'thugnerdz-modal-backdrop-root';
    const modalPortalId = 'thugnerdz-modal-root';

    return <Fragment>

        {<Portal id={backdropPortalId}>
            <Backdrop onClick={props.handleClose}className={props.show ? ` ${styles.visible}` : ''} />
        </Portal>}

        {<Portal id={modalPortalId}>
            <div className={`${styles.modal}${props.show ? ` ${styles.visible}` : ''}${props.className ? ` ${props.className}` : ''}`}>

                <Section className={`${styles.modalMain}${props.mainClassName ? ` ${props.mainClassName}` : ''}`}>

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
            </div>
        </Portal>}

    </Fragment>;
};

export default Modal;