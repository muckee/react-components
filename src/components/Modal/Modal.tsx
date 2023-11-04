import React, {
    Fragment,
    ReactNode,
} from 'react';
import Backdrop from '../Backdrop';
import Button from '../Button';
import Header from '../Header';
import Footer from '../Footer';
import Menu from '../Menu';
import Portal from '../Portal';
import Section from '../Section';

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
                        <h2>{heading}</h2>
                    </Header>}

                    {children}

                    <Footer>
                        <Menu items={[
                            <Button
                                key={0}
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </Button>,
                        ]} />
                    </Footer>

                </Section>
            </div>
        </Portal>}

    </Fragment>;
};

export default Modal;