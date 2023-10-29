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
  heading?: string | undefined;
  children?: ReactNode | undefined;
}

const Modal = (props: ModalProps) => {

    const {
        handleClose,
        show,
        className,
        mainClassName,
        heading,
        children,
    } = props;

    const backdropPortalId = 'thugnerdz-modal-backdrop-root';
    const modalPortalId = 'thugnerdz-modal-root';

    return <Fragment>

        {<Portal id={backdropPortalId}>
            <Backdrop onClick={handleClose} className={show ? ` ${styles.visible}` : ''} />
        </Portal>}

        {<Portal id={modalPortalId}>
            <div className={`${styles.modal}${show ? ` ${styles.visible}` : ''}${className ? ` ${className}` : ''}`}>

                <Section className={`${styles.modalMain}${mainClassName ? ` ${mainClassName}` : ''}`}>

                    {heading && <Header>
                        <Button type="button" className={styles.closeButton} onClick={handleClose}>
                            Close
                        </Button>
                        <h2>{heading}</h2>
                    </Header>}

                    {children}

                    {!heading && <Footer>
                        <Button type="button" onClick={handleClose}>
                            Close
                        </Button>
                    </Footer>}

                </Section>
            </div>
        </Portal>}

    </Fragment>;
};

export default Modal;